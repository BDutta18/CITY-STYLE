import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserPreferences } from '../services/productService';
import '../styles/Onboarding.css';

const STEP_ICONS = {
    gender: { Male: '👨', Female: '👩', 'Non-Binary': '🧑', 'Prefer not to say': '🤐' },
    ageRange: { '16-20': '🎓', '21-25': '🎯', '26-30': '💼', '31-40': '🏡', '40+': '🌟' },
    style: { Streetwear: '🔥', Casual: '😎', Formal: '👔', Sporty: '⚡', Minimalist: '🤍' },
    fit: { Oversized: '📐', Regular: '👕', Slim: '✂️' },
    budget: { 'Under $30': '💵', '$30-$60': '💰', '$60-$100': '💎', '$100+': '👑' },
    categories: { Hoodies: '🧥', 'T-Shirts': '👕', Coats: '🧥', Jeans: '👖', Accessories: '🎒', Sneakers: '👟' }
};

const STEPS = [
    {
        id: 'gender',
        title: 'Who are you shopping for?',
        subtitle: 'This helps us tailor your recommendations.',
        options: ['Male', 'Female', 'Non-Binary', 'Prefer not to say'],
        multi: false
    },
    {
        id: 'ageRange',
        title: 'What is your age range?',
        subtitle: 'We will show you age-appropriate styles.',
        options: ['16-20', '21-25', '26-30', '31-40', '40+'],
        multi: false
    },
    {
        id: 'style',
        title: 'What is your typical style?',
        subtitle: 'Select all that apply to you.',
        options: ['Streetwear', 'Casual', 'Formal', 'Sporty', 'Minimalist'],
        multi: true
    },
    {
        id: 'fit',
        title: 'How do you like your clothes to fit?',
        subtitle: 'We will prioritize items with this fit.',
        options: ['Oversized', 'Regular', 'Slim'],
        multi: false
    },
    {
        id: 'budget',
        title: 'What is your usual budget per item?',
        subtitle: 'This helps us stay within your range.',
        options: ['Under $30', '$30-$60', '$60-$100', '$100+'],
        multi: false
    },
    {
        id: 'categories',
        title: 'What are you looking for today?',
        subtitle: 'Select the items you buy most often.',
        options: ['Hoodies', 'T-Shirts', 'Coats', 'Jeans', 'Accessories', 'Sneakers'],
        multi: true
    }
];

const Onboarding = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [preferences, setPreferences] = useState({
        gender: '',
        ageRange: '',
        style: [],
        fit: '',
        budget: '',
        categories: []
    });
    const [animationClass, setAnimationClass] = useState('slide-in-right');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate('/auth');
            return;
        }

        // Pre-fill if user already has preferences
        const fetchExisting = async () => {
            try {
                const token = await user.getIdToken();
                const existing = await getUserPreferences(token);
                if (existing && existing.onboardingCompleted) {
                    setPreferences({
                        gender: existing.gender || '',
                        ageRange: existing.ageRange || '',
                        style: existing.style || [],
                        fit: existing.fit || '',
                        budget: existing.budget || '',
                        categories: existing.categories || []
                    });
                }
            } catch (err) {
                // Ignore — proceed with empty preferences
            }
        };
        fetchExisting();
    }, [user, navigate]);

    const currentStep = STEPS[currentStepIndex];

    const handleOptionClick = (option) => {
        if (currentStep.multi) {
            setPreferences(prev => {
                const currentSelected = prev[currentStep.id];
                if (currentSelected.includes(option)) {
                    return { ...prev, [currentStep.id]: currentSelected.filter(item => item !== option) };
                } else {
                    return { ...prev, [currentStep.id]: [...currentSelected, option] };
                }
            });
        } else {
            setPreferences(prev => ({ ...prev, [currentStep.id]: option }));
        }
    };

    const handleNext = async () => {
        if (currentStepIndex < STEPS.length - 1) {
            setAnimationClass('');
            setTimeout(() => {
                setCurrentStepIndex(prev => prev + 1);
                setAnimationClass('slide-in-right');
            }, 50);
        } else {
            await submitPreferences();
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setAnimationClass('');
            setTimeout(() => {
                setCurrentStepIndex(prev => prev - 1);
                setAnimationClass('slide-in-left');
            }, 50);
        }
    };

    const handleSkip = async () => {
        if (currentStepIndex < STEPS.length - 1) {
            setAnimationClass('');
            setTimeout(() => {
                setCurrentStepIndex(prev => prev + 1);
                setAnimationClass('slide-in-right');
            }, 50);
        } else {
            await submitPreferences();
        }
    };

    const submitPreferences = async () => {
        setIsSubmitting(true);
        try {
            if (user) {
                const token = await user.getIdToken();
                await fetch(`${import.meta.env.VITE_API_URL}/api/users/preferences`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(preferences)
                });
            }
            setIsFinished(true);
        } catch (error) {
            console.error('Failed to save preferences:', error);
            setIsFinished(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const finishOnboarding = () => {
        navigate('/shop');
    };

    // Build a summary of selected preferences
    const buildSummary = () => {
        const parts = [];
        if (preferences.gender) parts.push(preferences.gender);
        if (preferences.ageRange) parts.push(`aged ${preferences.ageRange}`);
        if (preferences.style.length > 0) parts.push(preferences.style.join(', ') + ' style');
        if (preferences.fit) parts.push(`${preferences.fit} fit`);
        if (preferences.budget) parts.push(preferences.budget + ' budget');
        if (preferences.categories.length > 0) parts.push(`into ${preferences.categories.join(', ')}`);
        return parts.length > 0 ? parts.join(' · ') : 'No preferences selected — we\'ll show you everything!';
    };

    if (isFinished) {
        return (
            <div className="onboarding-container">
                <div className="onboarding-card final-step">
                    <i className="ri-check-double-line final-icon"></i>
                    <h2 className="step-title">Your Style Profile is Ready!</h2>
                    <p className="step-subtitle">We've personalized your recommendations based on your preferences.</p>
                    <div className="preference-summary">
                        <p>{buildSummary()}</p>
                    </div>
                    <button onClick={finishOnboarding} className="start-shopping-btn">
                        Explore the Shop
                    </button>
                </div>
            </div>
        );
    }

    const isNextDisabled = () => {
        const val = preferences[currentStep.id];
        if (currentStep.multi) {
            return val.length === 0;
        }
        return !val;
    };

    const progressPercentage = ((currentStepIndex + 1) / STEPS.length) * 100;

    return (
        <div className="onboarding-container">
            <div className="onboarding-card">

                <div className="progress-bar-container">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>

                <div className="step-counter">
                    Step {currentStepIndex + 1} of {STEPS.length}
                </div>

                <div className={`step-content ${animationClass}`}>
                    <div className="step-header">
                        <h2 className="step-title">{currentStep.title}</h2>
                        <p className="step-subtitle">{currentStep.subtitle}</p>
                    </div>

                    <div className="options-grid">
                        {currentStep.options.map(option => {
                            const isSelected = currentStep.multi
                                ? preferences[currentStep.id].includes(option)
                                : preferences[currentStep.id] === option;

                            const icon = STEP_ICONS[currentStep.id]?.[option];

                            return (
                                <div
                                    key={option}
                                    className={`option-card ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {icon && <span className="option-icon">{icon}</span>}
                                    <span className="option-label">{option}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="step-actions">
                    <div className="step-actions-left">
                        {currentStepIndex > 0 && (
                            <button className="back-btn" onClick={handleBack} disabled={isSubmitting}>
                                <i className="ri-arrow-left-line"></i> Back
                            </button>
                        )}
                        <button className="skip-btn" onClick={handleSkip} disabled={isSubmitting}>
                            Skip this step
                        </button>
                    </div>

                    <button
                        className="next-btn"
                        onClick={handleNext}
                        disabled={isNextDisabled() || isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : (currentStepIndex === STEPS.length - 1 ? 'Finish' : 'Next')}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Onboarding;
