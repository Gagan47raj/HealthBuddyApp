import React from 'react';
import './AboutUs.css'; 

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h1>About Us</h1>
            <section className="intro">
                <h2>Welcome to Our Health Buddy</h2>
                <p>
                    Our healthcare app is designed to revolutionize the way you access and manage your health. We provide a seamless and user-friendly platform that brings healthcare to your fingertips. Whether you need to book an appointment, consult with a doctor, or track your health metrics, our app has got you covered. We believe that healthcare should be accessible, efficient, and personalized, and our app is a testament to that vision.
                </p>
            </section>
            <section className="mission">
                <h2>Our Mission</h2>
                <p>
                    Our mission is to improve the health and well-being of our community by providing accessible, high-quality healthcare services. We strive to empower individuals to take control of their health through our innovative app. By combining cutting-edge technology with compassionate care, we aim to bridge the gap between patients and healthcare providers. Our goal is to make healthcare more inclusive and equitable for everyone, regardless of their background or location.
                </p>
            </section>
            <section className="vision">
                <h2>Our Vision</h2>
                <p>
                    Our vision is to be the leading healthcare provider, recognized for our innovative approach to patient care and commitment to health excellence. We envision a future where everyone has access to the best possible healthcare, and where technology and human touch work hand in hand to create a healthier world. We are dedicated to constantly improving our services and staying at the forefront of healthcare innovation.
                </p>
            </section>
            <section className="team">
                <h2>Our Team</h2>
                <p>
                    Our team of healthcare professionals is dedicated to ensuring that you receive the best possible care. From experienced doctors to compassionate support staff, we are here to help you every step of the way. Our team members are experts in their fields and are committed to continuous learning and professional development. We believe that a strong team is the foundation of exceptional healthcare, and we work together to provide comprehensive and coordinated care to our patients.
                </p>
                <p>
                    We value the trust you place in us, and we are dedicated to upholding the highest standards of care. Our team is not just about medical expertise; we are about creating a supportive and understanding environment where you feel heard and respected. Together, we strive to make a positive impact on your health and well-being.
                </p>
            </section>
        </div>
    );
};

export default AboutUs;