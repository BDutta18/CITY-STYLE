import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SizeGuide.css";

const tabData = [
  { id: "tops", label: "Tops & T-Shirts" },
  { id: "hoodies", label: "Hoodies & Sweatshirts" },
  { id: "outerwear", label: "Coats & Jackets" },
  { id: "bottoms", label: "Pants & Bottoms" },
];

const SizeGuide = () => {
  const [activeTab, setActiveTab] = useState("tops");

  return (
    <div>
      <nav>
        <div className="nav__header">
          <div className="nav__logo">
            <Link to="/">CITY STYLE</Link>
          </div>
          <div className="nav__menu__btn" id="menu-btn">
            <i className="ri-menu-line"></i>
          </div>
        </div>
        <ul className="nav__links" id="nav-links">
          <li><Link to="/#catalogue">CATALOGUE</Link></li>
          <li><Link to="/#fashion">FASHION</Link></li>
          <li><Link to="/#favourite">FAVOURITE</Link></li>
          <li><Link to="/#lifestyle">LIFESTYLE</Link></li>
          <li>
            <Link to="/auth" className="btn" style={{ color: "white" }}>SIGN UP</Link>
          </li>
        </ul>
      </nav>

      <section className="size__header">
        <h1>Size Guide</h1>
        <p>Find your perfect fit with our comprehensive size charts and measuring tips</p>
      </section>

      <div className="size__container">
        {/* Category Tabs */}
        <div className="size__tabs">
          {tabData.map(tab => (
            <button
              key={tab.id}
              className={`size__tab${activeTab === tab.id ? " active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tops & T-Shirts */}
        <div className={`size__content${activeTab === "tops" ? " active" : ""}`} id="tops">
          <div className="size__section">
            <h2 className="size__section-title"><i className="ri-t-shirt-line"></i> Tops & T-Shirts Size Chart</h2>
            <div className="size__table-wrapper">
              <table className="size__table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>US/UK</th>
                    <th>EU</th>
                    <th>Chest (in)</th>
                    <th>Chest (cm)</th>
                    <th>Length (in)</th>
                    <th>Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>XS</td><td>2-4</td><td>32-34</td><td>32-34</td><td>81-86</td><td>26</td><td>66</td></tr>
                  <tr><td>S</td><td>6-8</td><td>36-38</td><td>35-37</td><td>89-94</td><td>27</td><td>69</td></tr>
                  <tr><td>M</td><td>10-12</td><td>40-42</td><td>38-40</td><td>97-102</td><td>28</td><td>71</td></tr>
                  <tr><td>L</td><td>14-16</td><td>44-46</td><td>41-43</td><td>104-109</td><td>29</td><td>74</td></tr>
                  <tr><td>XL</td><td>18-20</td><td>48-50</td><td>44-46</td><td>112-117</td><td>30</td><td>76</td></tr>
                  <tr><td>2XL</td><td>22-24</td><td>52-54</td><td>47-49</td><td>119-124</td><td>31</td><td>79</td></tr>
                  <tr><td>3XL</td><td>26-28</td><td>56-58</td><td>50-52</td><td>127-132</td><td>32</td><td>81</td></tr>
                </tbody>
              </table>
            </div>
            <h3 className="size__section-title" style={{ marginTop: "2rem" }}><i className="ri-shirt-line"></i> Oversized T-Shirts</h3>
            <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>Our oversized styles are designed to fit loose. We recommend ordering your regular size for the intended relaxed look, or size down for a less oversized fit.</p>
            <div className="size__table-wrapper">
              <table className="size__table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest (in)</th>
                    <th>Chest (cm)</th>
                    <th>Length (in)</th>
                    <th>Length (cm)</th>
                    <th>Shoulder (in)</th>
                    <th>Shoulder (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>S</td><td>42-44</td><td>107-112</td><td>28</td><td>71</td><td>20</td><td>51</td></tr>
                  <tr><td>M</td><td>45-47</td><td>114-119</td><td>29</td><td>74</td><td>21</td><td>53</td></tr>
                  <tr><td>L</td><td>48-50</td><td>122-127</td><td>30</td><td>76</td><td>22</td><td>56</td></tr>
                  <tr><td>XL</td><td>51-53</td><td>130-135</td><td>31</td><td>79</td><td>23</td><td>58</td></tr>
                  <tr><td>2XL</td><td>54-56</td><td>137-142</td><td>32</td><td>81</td><td>24</td><td>61</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Hoodies & Sweatshirts */}
        <div className={`size__content${activeTab === "hoodies" ? " active" : ""}`} id="hoodies">
          <div className="size__section">
            <h2 className="size__section-title"><i className="ri-hoodie-line"></i> Hoodies & Sweatshirts Size Chart</h2>
            <div className="size__table-wrapper">
              <table className="size__table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>US/UK</th>
                    <th>EU</th>
                    <th>Chest (in)</th>
                    <th>Chest (cm)</th>
                    <th>Length (in)</th>
                    <th>Sleeve (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>XS</td><td>2-4</td><td>32-34</td><td>36-38</td><td>91-97</td><td>25</td><td>32</td></tr>
                  <tr><td>S</td><td>6-8</td><td>36-38</td><td>39-41</td><td>99-104</td><td>26</td><td>33</td></tr>
                  <tr><td>M</td><td>10-12</td><td>40-42</td><td>42-44</td><td>107-112</td><td>27</td><td>34</td></tr>
                  <tr><td>L</td><td>14-16</td><td>44-46</td><td>45-47</td><td>114-119</td><td>28</td><td>35</td></tr>
                  <tr><td>XL</td><td>18-20</td><td>48-50</td><td>48-50</td><td>122-127</td><td>29</td><td>36</td></tr>
                  <tr><td>2XL</td><td>22-24</td><td>52-54</td><td>51-53</td><td>130-135</td><td>30</td><td>36.5</td></tr>
                  <tr><td>3XL</td><td>26-28</td><td>56-58</td><td>54-56</td><td>137-142</td><td>31</td><td>37</td></tr>
                </tbody>
              </table>
            </div>
            <p style={{ color: "var(--text-light)", marginTop: "1.5rem" }}><strong style={{ color: "var(--text-dark)" }}>Fit Note:</strong> Our hoodies are designed with a relaxed, comfortable fit. If you prefer a slimmer silhouette, consider sizing down.</p>
          </div>
        </div>

        {/* Coats & Jackets */}
        <div className={`size__content${activeTab === "outerwear" ? " active" : ""}`} id="outerwear">
          <div className="size__section">
            <h2 className="size__section-title"><i className="ri-windbreaker-line"></i> Coats & Jackets Size Chart</h2>
            <div className="size__table-wrapper">
              <table className="size__table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>US/UK</th>
                    <th>EU</th>
                    <th>Chest (in)</th>
                    <th>Chest (cm)</th>
                    <th>Length (in)</th>
                    <th>Sleeve (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>XS</td><td>2-4</td><td>32-34</td><td>38-40</td><td>97-102</td><td>27</td><td>33</td></tr>
                  <tr><td>S</td><td>6-8</td><td>36-38</td><td>41-43</td><td>104-109</td><td>28</td><td>34</td></tr>
                  <tr><td>M</td><td>10-12</td><td>40-42</td><td>44-46</td><td>112-117</td><td>29</td><td>35</td></tr>
                  <tr><td>L</td><td>14-16</td><td>44-46</td><td>47-49</td><td>119-124</td><td>30</td><td>36</td></tr>
                  <tr><td>XL</td><td>18-20</td><td>48-50</td><td>50-52</td><td>127-132</td><td>31</td><td>36.5</td></tr>
                  <tr><td>2XL</td><td>22-24</td><td>52-54</td><td>53-55</td><td>135-140</td><td>32</td><td>37</td></tr>
                  <tr><td>3XL</td><td>26-28</td><td>56-58</td><td>56-58</td><td>142-147</td><td>33</td><td>37.5</td></tr>
                </tbody>
              </table>
            </div>
            <p style={{ color: "var(--text-light)", marginTop: "1.5rem" }}><strong style={{ color: "var(--text-dark)" }}>Layering Tip:</strong> Our coats and jackets are designed to accommodate layering. If you plan to wear thick sweaters underneath, consider sizing up.</p>
          </div>
        </div>

        {/* Pants & Bottoms */}
        <div className={`size__content${activeTab === "bottoms" ? " active" : ""}`} id="bottoms">
          <div className="size__section">
            <h2 className="size__section-title"><i className="ri-trousers-line"></i> Pants & Bottoms Size Chart</h2>
            <div className="size__table-wrapper">
              <table className="size__table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>US</th>
                    <th>EU</th>
                    <th>Waist (in)</th>
                    <th>Waist (cm)</th>
                    <th>Hip (in)</th>
                    <th>Hip (cm)</th>
                    <th>Inseam (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>XS</td><td>24-25</td><td>32-34</td><td>24-25</td><td>61-64</td><td>34-35</td><td>86-89</td><td>30</td></tr>
                  <tr><td>S</td><td>26-27</td><td>36-38</td><td>26-27</td><td>66-69</td><td>36-37</td><td>91-94</td><td>30</td></tr>
                  <tr><td>M</td><td>28-29</td><td>40-42</td><td>28-29</td><td>71-74</td><td>38-39</td><td>97-99</td><td>31</td></tr>
                  <tr><td>L</td><td>30-32</td><td>44-46</td><td>30-32</td><td>76-81</td><td>40-42</td><td>102-107</td><td>31</td></tr>
                  <tr><td>XL</td><td>33-35</td><td>48-50</td><td>33-35</td><td>84-89</td><td>43-45</td><td>109-114</td><td>32</td></tr>
                  <tr><td>2XL</td><td>36-38</td><td>52-54</td><td>36-38</td><td>91-97</td><td>46-48</td><td>117-122</td><td>32</td></tr>
                  <tr><td>3XL</td><td>39-41</td><td>56-58</td><td>39-41</td><td>99-104</td><td>49-51</td><td>124-130</td><td>32</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* How to Measure */}
        <div className="size__section">
          <h2 className="size__section-title"><i className="ri-ruler-2-line"></i> How to Measure</h2>
          <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>For the most accurate fit, take measurements over undergarments or light clothing. Use a soft measuring tape and keep it snug but not tight.</p>
          <div className="measure__guide">
            <div className="measure__card">
              <div className="measure__card-icon"><i className="ri-expand-width-line"></i></div>
              <h3>Chest / Bust</h3>
              <p>Measure around the fullest part of your chest, keeping the tape level under your arms and across your shoulder blades.</p>
            </div>
            <div className="measure__card">
              <div className="measure__card-icon"><i className="ri-circle-line"></i></div>
              <h3>Waist</h3>
              <p>Measure around your natural waistline, which is the narrowest part of your torso. Keep the tape comfortably loose.</p>
            </div>
            <div className="measure__card">
              <div className="measure__card-icon"><i className="ri-shapes-line"></i></div>
              <h3>Hips</h3>
              <p>Stand with feet together and measure around the fullest part of your hips, typically 7-8 inches below your waist.</p>
            </div>
            <div className="measure__card">
              <div className="measure__card-icon"><i className="ri-arrow-down-line"></i></div>
              <h3>Inseam</h3>
              <p>Measure from your crotch to the bottom of your ankle bone along the inside of your leg while standing straight.</p>
            </div>
            <div className="measure__card">
              <div className="measure__card-icon"><i className="ri-coupon-3-line"></i></div>
              <h3>Sleeve Length</h3>
              <p>Measure from the center back of your neck, over your shoulder, down to your wrist with arm slightly bent.</p>
            </div>
            <div className="measure__card">
              <div className="measure__card-icon"><i className="ri-arrow-up-down-line"></i></div>
              <h3>Length</h3>
              <p>For tops, measure from the highest point of your shoulder to where you want the garment to end.</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips__section">
          <h2><i className="ri-lightbulb-line"></i> Sizing Tips</h2>
          <div className="tips__grid">
            <div className="tip__item">
              <i className="ri-checkbox-circle-line"></i>
              <p><strong>Between sizes?</strong> For a relaxed fit, size up. For a fitted look, size down or stick with the smaller size.</p>
            </div>
            <div className="tip__item">
              <i className="ri-checkbox-circle-line"></i>
              <p><strong>Oversized styles</strong> are designed to fit loose. Order your regular size for the intended look.</p>
            </div>
            <div className="tip__item">
              <i className="ri-checkbox-circle-line"></i>
              <p><strong>Read reviews!</strong> Customer feedback often includes helpful sizing information from real buyers.</p>
            </div>
            <div className="tip__item">
              <i className="ri-checkbox-circle-line"></i>
              <p><strong>Not sure?</strong> Each product page has specific fit notes. Check them before ordering.</p>
            </div>
            <div className="tip__item">
              <i className="ri-checkbox-circle-line"></i>
              <p><strong>Shrinkage:</strong> Our cotton items may shrink slightly after washing. Consider this when choosing sizes.</p>
            </div>
            <div className="tip__item">
              <i className="ri-checkbox-circle-line"></i>
              <p><strong>Free returns:</strong> Not the right fit? We offer hassle-free returns within 30 days.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="size__help">
        <h2>Need More Help?</h2>
        <p>Our team is here to help you find your perfect fit!</p>
        <Link to="/contact" className="btn">Contact Us</Link>
      </section>

      <footer>
        <div className="section__container footer__container">
          <div className="footer__col">
            <div className="footer__logo">
              <Link to="/">CITY STYLE</Link>
            </div>
            <p>Complete your style with awesome clothes from us.</p>
            <ul className="footer__socials">
              <li><a href="#"><i className="ri-facebook-fill"></i></a></li>
              <li><a href="#"><i className="ri-instagram-line"></i></a></li>
              <li><a href="#"><i className="ri-twitter-fill"></i></a></li>
              <li><a href="#"><i className="ri-linkedin-fill"></i></a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <ul className="footer__links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/career">Careers</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/store-location">Store Location</Link></li>
              <li><Link to="/order-tracking">Order Tracking</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Legal</h4>
            <ul className="footer__links">
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bar">
          Copyright © Bodhisatwa Dutta 2024. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SizeGuide;