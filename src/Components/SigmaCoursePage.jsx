import React from 'react';
import { useNavigate } from "react-router-dom";
import left from "../assets/banner_top_image.png";
 
const CourseCard = ({ title, color, features, duration, startDate }) => (
  
  <div className="w-full md:w-1/2 lg:w-1/3 p-4">
    <div className={`bg-${color}-500 text-white rounded-lg shadow-lg overflow-hidden`}>
      <div className={`bg-${color}-600 p-4`}>
        <h3 className="text-center text-xl font-semibold">{title}</h3>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between">
          <div><strong>Duration:</strong> {duration}</div>
          <div><strong>Start Date:</strong> {startDate}</div>
        </div>
      </div>
    </div>
  </div>
);
 

const FeatureBox = ({ title, features }) => (
  <div className="w-full md:w-1/3 p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const CompaniesSection = () => {
  const companies = [
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/ec5be16b046b62a2a860b67f9dc55b86.png",
      alt: "Amazon",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/ee17a1d06126f8bfc5444ad666e8ba21.png",
      alt: "Google",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/9e4198383730a6e7036b2c7cf50554d0.png",
      alt: "Microsoft",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/5a5a608278ba2b74aff5fb081f7df81c.png",
      alt: "Goldman Sachs",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/02fb63567e1b107d549d5d15e922424b.png",
      alt: "PayPal",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/4d6e24add7d7c5d618aeef1795dba038.png",
      alt: "Samsung",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/622a116daf32436d38271cd6c49ee3af.png",
      alt: "Salesforce",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/cfe53c7856b98c0bf010ebcfc8cbfa29.png",
      alt: "NetApp",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/91cb8fef8fe424a1ae2406aa58a380d8.png",
      alt: "Hitachi",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/689bf09a2c1040423fba7a8db0248211.png",
      alt: "JPMorgan",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/b5070669b92945ffb20fadc3ea552d16.png",
      alt: "IBM",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/0f683ab474c5a018baa3bdd53330c9ae.png",
      alt: "Dell",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/e24ce5f542c45a73c05172d9c4f38e2e.png",
      alt: "Deloitte",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/f271b7c4e1a5c41745580804a2b2b458.png",
      alt: "KPMG",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/2c6580da38af7ceff65addfda59f06b9.png",
      alt: "ISRO",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/1da11f6f0c244abc5abffc0556730e91.png",
      alt: "Mercedes-Benz",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/f226d6ddcb4f38c2c23f02008bbdf737.png",
      alt: "EY",
    },
    {
      src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/9a47085894be9870158c9ad4e23c1a24.png",
      alt: "Airtel",
    }
   
    // Add other companies here...
  ];

  return (
    <section className="companies py-16 text-center bg-gray-100">
      <h2 className="font-semibold text-4xl">
        Thousands of students achieved their{" "}
        <span className="text-indigo-600">dream job at</span>
      </h2>
      <div className="flex flex-wrap justify-center items-center mt-8">
        {companies.map((company, index) => (
          <img
            key={index}
            src={company.src}
            alt={company.alt}
            className="w-40 h-auto mx-4 my-4"
          />
        ))}
      </div>
    </section>
  );
};

const App = () => {
  const navigate = useNavigate();
  const courseFeaturesAlpha = [
    'Complete DSA Batch',
    'Java Language',
    'Data Structures & Algorithms',
    'Advanced DSA',
    '50 Live Practice Sessions',
    'Quant & Aptitude Preparation',
    'Individual Doubt Support',
    'Certificate of Completion',
  ];

  const courseFeaturesSigma = [
    'Complete DSA + Web Development',
    'Everything in Alpha Plus 4.0',
    'Project Development',
    'MERN Stack',
    'Frontend & React',
    'Backend & Database',
    'Multiple Project Implementations',
    '2 Certificates of Completion',
  ];

  const featuresData = [
    {
      title: 'Data Structures & Algorithms',
      features: [
        'Java Language',
        'Data Structures & Algorithms',
        'Advanced DSA',
        '50 Live Practice Sessions with MAANG Engineers',
        'Individual doubt support: TA',
        'Certificate of Completion',
        'Duration: 4 months',
      ],
    },
    {
      title: 'Full Stack Web Development',
      features: [
        'Complete MERN Stack',
        'Frontend & React',
        'Backend & Database',
        'Git & Github',
        'Multiple Industry Grade Projects',
        'Individual doubt support: TA',
        'Certificate of Completion',
        'Duration: 4.5 Months',
      ],
    },
    {
      title: 'Quant & Aptitude Preparation',
      features: [
        'Data Structures & Algorithms',
        'Advanced DSA',
        '50 Live Practice Sessions with MAANG Engineers',
        'Quant & Aptitude Practice',
        'Individual doubt support: TA',
        'Certificate of Completion',
        'Duration: 4 months',
      ],
    },
  ];

  return (
    <div className="font-sans bg-gray-50">
      <div className="container mx-auto px-4 mt-12 pt-6">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold leading-tight">
              <span className="text-blue-500">Sigma 5.0 :</span> Complete Placement Preparation!
            </h1>
            <ul className="mt-6 space-y-2 text-lg text-gray-700">
              <li><i className="bi bi-camera-video"></i> DSA + Development + Quant-Aptitude</li>
              <li><i className="bi bi-people"></i> Individual Doubt Solving TAs & Community</li>
              <li><i className="bi bi-journal"></i> Access to PYQs of Top Companies</li>
            </ul>
            
         <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-600"  onClick={() => navigate("/payment")}>
                       Enroll Now ➤
                     </button>
     
     
     
     
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <img src={left} alt="Profile" className="w-full h-auto" />
          </div>
        </div>
      </div>
      

      {/* Course Comparison Section */}
      <div className="bg-gray-100 mt-10 p-10 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl font-semibold mb-6">Course Comparison</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Alpha Plus 4.0 Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="bg-blue-600 text-white text-center py-2 rounded-t-lg font-bold text-lg">Alpha Plus 4.0</h3>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>✅ Complete DSA Batch</li>
              <li>✅ Java Language</li>
              <li>✅ Data Structures & Algorithms</li>
              <li>✅ Advanced DSA</li>
              <li>✅ 50 Live Practice Sessions</li>
              <li>✅ Quant & Aptitude Preparation</li>
              <li>✅ Individual Doubt Support</li>
              <li>✅ Certificate of Completion</li>
            </ul>
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <span><strong>Duration:</strong> 4 months</span>
              <span><strong>Start Date:</strong> 28th Oct, 2024</span>
            </div>
          </div>

          {/* Sigma 5.0 Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="bg-green-600 text-white text-center py-2 rounded-t-lg font-bold text-lg">Sigma 5.0</h3>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>✅ Complete DSA + Web Development</li>
              <li>✅ Modern JavaScript</li>
              <li>✅ React + Node.js</li>
              <li>✅ Database Integration</li>
              <li>✅ 50+ Live Coding Practice</li>
              <li>✅ Mock Interviews & Doubt Solving</li>
              <li>✅ Certification</li>
            </ul>
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <span><strong>Duration:</strong> 5 months</span>
              <span><strong>Start Date:</strong> 15th Nov, 2024</span>
            </div>
          </div>
        </div>
      </div>

      <CompaniesSection />

      <div className="container mx-auto px-4 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">What will you <span className="text-blue-500">learn</span> in Sigma 5.0?</h2>
        <div className="flex flex-wrap ">
          {featuresData.map((feature, index) => (
            <FeatureBox key={index} title={feature.title} features={feature.features} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
