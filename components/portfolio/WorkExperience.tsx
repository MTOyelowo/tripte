import React, { FC } from "react";
import ExperienceItem, { ResumeItemProps } from "./ExperienceItem";

const experienceItems: ResumeItemProps[] = [
  {
    company: "TopRate Transfer",
    dateRange: "Jun 2023 – May 2024",
    descriptions: [
      "Spearheaded the design and implementation of the Admin Dashboard, focusing on user-friendly web-based UI/UX and seamless API integrations. Key features included user and staff management, transaction monitoring, and currency pairing management.",
      "Led the development of the authentication system user interface, ensuring robust security measures and a smooth user experience through meticulous frontend design and API integration.",
      "Contributed to the development of the Customer Dashboard by integrating web-based UI/UX and APIs, facilitating intuitive money transfers, affiliate programs, and referral processes.",
      "Designed and deployed a responsive WordPress blog site to disseminate company news and articles, enhancing brand visibility and communication strategies.",
      "Authored detailed documentation for system components and features, providing valuable insights for operational efficiency and team collaboration.",
    ],
    position: "Frontend Developer",
  },
  {
    company: "Freelance",
    dateRange: "Since 2021",
    descriptions: [
      "Written over 300 product reviews, articles, and diverse content pieces for various independent blogs, showcasing versatility and expertise in writing for different niches and audiences.",
    ],
    position: "Freelance Writer",
  },
  {
    company: "Industrial Training Fund Headquaters",
    dateRange: "Jan - Nov 2021",
    descriptions: [
      "Delivered comprehensive IT technical support to the Fund's staff, ensuring seamless operations and resolving technical issues promptly.",
      "Provided vital office administration support, contributing to the smooth functioning of daily activities within the organization.",
      "Implemented user-friendly Excel spreadsheets to streamline vehicle maintenance record-keeping processes, enhancing efficiency and accuracy.",
      "Conducted informal training sessions for junior staff members to elevate their proficiency in Microsoft Word, Excel, and PowerPoint from basic to intermediate levels, fostering a more skilled workforce.",
    ],
    position: "Technical Staff Support (NYSC Primary Assignment)",
  },
  {
    company: "Industrial Training Fund Headquaters",
    dateRange: "May - Oct 2019",
    descriptions: [
      "Crafted visually compelling posters and infographics utilizing Adobe Photoshop and CorelDRAW, elevating the brand presence and communication efforts of the Publicity Department.",
      "Mentored fellow interns by introducing them to foundational concepts in Python programming, fostering a collaborative learning environment and empowering team members to expand their skill sets.",
    ],
    position: "Frontend development / Graphics Design Intern",
  },
  {
    company: "The Tick Times Nigeria",
    dateRange: "2016 - 2017",
    descriptions: [
      "Curated news from Nigeria and worldwide sources for online publication, ensuring timely and relevant content delivery.",
      "Authored numerous articles and opinion pieces covering a wide range of general topics, contributing to the diverse content offerings of the publication.",
    ],
    position: "News Writer",
  },
];

const WorkExperience: FC = () => {
  return (
    <div className="flex flex-col gap-16 md:gap-20 py-16 px-4 md:px-0 w-full md:w-[70%] mx-auto font-freeman">
      <div className="border-b-2 border-gray-700 dark:border-gray-300 w-fit">
        <h2 className="text-left text-4xl leading-6 text-gray-700 dark:text-gray-300 mb-3">
          Work Experience
        </h2>
      </div>
      <ul className="list-none flex flex-col gap-8 md:gap-12 md:ml-16 md:pl-28 md:border-l-2 md:border-gray-700 md:dark:border-gray-300 relative">
        {experienceItems.map((item, index) => (
          <ExperienceItem
            key={index}
            dateRange={item.dateRange}
            company={item.company}
            position={item.position}
            descriptions={item.descriptions}
          />
        ))}
      </ul>
    </div>
  );
};

export default WorkExperience;
