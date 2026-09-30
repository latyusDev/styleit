import React from "react";
import Remark from "./Remark";
import next from '../../images/next.png';
import { Link } from "react-router-dom";
import { trendingItems } from "@/static/data";
import { motion } from "motion/react";

const Trending = () => {
  return (
    <section className="container px-4 xl:px-0 mt-16">

      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="text-primary text-3xl md:text-4xl font-[helvetica] font-[700]">
          Trending
        </h1>
        <Link
          to="/trending"
          className="flex items-center gap-1 text-primary text-base md:text-xl font-[helvetica] font-[400] hover:opacity-75 transition-opacity"
        >
          See more
          <img src={next} alt="next" className="w-[8px] md:w-[12px]" />
        </Link>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            // viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-xl aspect-[3/4]"
          >
            <img
              src={item.img}
              alt={item.alt}
              className="w-full h-full object-cover"
            />
            <Remark img={item.remarkImg} />
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Trending;