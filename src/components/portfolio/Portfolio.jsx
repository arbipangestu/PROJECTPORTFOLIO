import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const items = [
  {
    id: 1,
    img: "/p1.jpeg",
    title: "Stevedoring Application",
    desc: "The Stevedoring Operation System is a robust multi-tenancy application designed to streamline and optimize the complex operations involved in stevedoring activities. This system encompasses various critical modules including Master Setup, Planning, Order Management, Realization Operational, Finance, and Reporting.",
    link: "/",
  },
  {
    id: 2,
    img: "/p2.jpeg",
    title: "E-Signature System",
    desc: "The project focuses on developing a comprehensive digital platform that encompasses user registration, digital signature processing, document validation, and the issuance of electronic certificates with QR codes. It aims to streamline administrative processes through the integration of a PSrE system, providing users with a seamless experience in managing digital documents and signatures.",
    link: "/",
  },
  {
    id: 3,
    img: "/p3.jpeg",
    title: "Samudera Malaysia Inland Transport System",
    desc: "Samudera Lautan Emas Sdn. Bhd. (SLE) is a trucking company that requires information related to transactions such as quotations, agreements, job orders, planning and availability of equipment, job order progress monitoring, and a track and trace system.",
    link: "/",
  },
  {
    id: 4,
    img: "/p4.jpeg",
    title: "Samudera Warehouse Management System",
    desc: "This project aims to develop a comprehensive logistics management system designed to optimize and streamline various aspects of logistics operations, including order management, shipment tracking, fleet management, and billing processes.",
    link: "/",
  },
  {
    id: 5,
    img: "/p5.png",
    title: "Chief Marketing Officer APPS",
    desc: "CMO is a mobile application designed to support field teams in customer acquisition and service operations. Equipped with features such as customer data input, document uploads, and real-time application tracking, CMO enhances the efficiency, accuracy, and speed of sales and survey activities on the go.",
    link: "/",
  },
];

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.05,
    },
  },
};

const ListItem = ({ item }) => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={item.img} alt="" />
      </motion.div>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
        <motion.a variants={textVariants} href={item.link}>
          <button>View Project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);
  const ref = useRef(null);

  // useEffect(() => {
  //   if (ref.current) {
  //     const rect = ref.current.getBoundingClientRect();
  //     setContainerDistance(rect.left);
  //   }
  // }, []);

  // FIX: Re-calculate when screen size changes
  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
    };

    calculateDistance();

    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{
            width: window.innerWidth - containerDistance,
            // backgroundColor: "pink",
          }}
        />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>
      <section />
      <section />
      <section />
      <section />
      <section />
      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#CF0F47"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;
