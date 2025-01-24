'use client'
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

var timerCount = 0;
var timer_on = 0;
var timeout;

export default function RandomBibleVerses({ len, bibleRefs }) {
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState("");
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (counter) {
      var randNo = Math.floor(Math.random() * len);
      setDisplayText(bibleRefs[randNo]);
      setShow(true);
    }
  }, [counter]);

  useEffect(() => {
    if (show) {
      setTimeout(() => setShow(false), 8000);
    }
  }, [show]);

  function timedCount() {
    ++timerCount;

    timeout = setTimeout(timedCount, 10000);
    setCounter(timerCount);
  }

  function startCount() {
    if (!timer_on) {
      timer_on = 1;
      timedCount();
    }
  }

  useEffect(() => {
    clearTimeout(timeout);
    timer_on = 0;
    timerCount = 0;
    setCounter(0);
    startCount(counter);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2
          }}
        >
          <
            //style={{ backgroundColor: "red", padding: "20px", height: "50px" }}
          >
            {displayText || defRef}
          </>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const defRef =
  "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me. John 14:6";
