import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountModule from "react-countup";
import { stats } from "../../data/content";
import { fadeUp } from "../../animations/variants";
import "./_stats.scss";

const Stats = () => {
  const ref = useRef(null);
  const CountUp = CountModule.default || CountModule;
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="statsSection" id="stats" ref={ref}>
      <div className="statsGrid">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: i * 0.1 }}
          >
            <div className="statNum">
              {inView ? (
                <CountUp
                  end={s.count}
                  duration={2}
                  formattingFn={(v) =>
                    s.display.replace(
                      /[\d.]+/,
                      v >= 1000
                        ? (v / 1000).toFixed(v >= 100000 ? 1 : 0)
                        : v >= 1000000
                          ? (v / 1000000).toFixed(1)
                          : v,
                    )
                  }
                  suffix={s.display.match(/[^0-9.]+$/)?.[0] ?? ""}
                />
              ) : (
                "0"
              )}
            </div>
            <div className="statLabel">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
