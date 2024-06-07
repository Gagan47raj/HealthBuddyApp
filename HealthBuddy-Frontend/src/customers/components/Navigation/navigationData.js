export const navigation = {
  categories: [
    {
      id: 'medical_devices',
      name: 'HealthBuddy',
      featured: [
        {
          name: 'Blood Pressure Monitors',
          href: '/',
          imageSrc: 'https://example.com/blood_pressure_monitors.jpg',
          imageAlt: 'Blood pressure monitors',
        },
        {
          name: 'Glucose Meters',
          href: '/',
          imageSrc: 'https://example.com/glucose_meters.jpg',
          imageAlt: 'Glucose meters',
        },
      ],
      sections: [
        {
          id: 'categories',
          name: 'Categories',
          items: [
            { name: 'Monitoring & Testing', href: '/medical_devices/monitoring_testing' },
            { name: 'Support & Braces', href: '/medical_devices/support_braces' },
            { name: 'Mobility Aids', href: '/medical_devices/mobility_aids' },
            { name: 'Respiratory Aids', href: '/medical_devices/respiratory_aids' },
            { name: 'Home Health Care', href: '/medical_devices/home_health_care' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: '🏠Home', href: '/' },
    { name: '💊Medicine', href: '/medicine' },
    { name: '🧑🏻‍⚕️HealthBuddy Assistant', href: 'http://127.0.0.1:5000'},
    { name: '🔬HealthBuddy Lab Test', href: 'http://localhost:8501'  },
    { name: '🕵🏼‍♂️Medicine Discovery', href: 'http://localhost:8502' },
    { name: '👨🏻‍💻About Us', href: '/aboutus' },
    { name: '📞Contact Us', href: '/contactus' },
  ],
};