import { useInView } from "framer-motion";
import React, { useRef } from "react";
import styled from "styled-components";
import {motion} from "framer-motion"
const NumberCard = ({head,sub}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.7 }}>
        <StyledWrapper>
          <div className="outer">
            <div className="dot" />
            <div className="card">
              <div className="ray" />
              <div className="text font-[inter]">{head}</div>
              <div className="text-xl font-[inter]">{sub}</div>
              <div className="line topl" />
              <div className="line leftl" />
              <div className="line bottoml" />
              <div className="line rightl" />
            </div>
          </div>
        </StyledWrapper>
    </motion.div>
  );
};

const StyledWrapper = styled.div`
  .outer {
  width: 300px;
  height: 250px;
  border-radius: 10px;
  padding: 1px;
  background: rgba( 255, 255, 255, 0.1 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
  position: relative;
}

.dot {
  width: 5px;
  aspect-ratio: 1;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 0 10px #ffffff;
  border-radius: 100px;
  z-index: 2;
  right: 10%;
  top: 10%;
  animation: moveDot 6s linear infinite;
}

@keyframes moveDot {
  0%,
  100% {
    top: 10%;
    right: 10%;
  }
  25% {
    top: 10%;
    right: calc(100% - 35px);
  }
  50% {
    top: calc(100% - 30px);
    right: calc(100% - 35px);
  }
  75% {
    top: calc(100% - 30px);
    right: 10%;
  }
}

.card {
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 9px;
  border: solid 1px #202222;
  background-size: 20px 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  color: #fff;
}
.ray {
  width: 220px;
  height: 45px;
  border-radius: 100px;
  position: absolute;
  background-color: #c7c7c7;
  opacity: 0.1;
  box-shadow: 0 0 50px #fff;
  filter: blur(10px);
  transform-origin: 10%;
  top: 0%;
  left: 0;
  transform: rotate(40deg);
}

.card .text {
  font-weight: bolder;
  font-size: 4rem;
  background: linear-gradient(45deg, #000000 4%, #fff, #000);
  background-clip: text;
  color: transparent;
}

.line {
  width: 100%;
  height: 1px;
  position: absolute;
  background-color: #2c2c2c;
}
.topl {
  top: 10%;
  background: linear-gradient(90deg, #888888 30%, #1d1f1f 70%);
}
.bottoml {
  bottom: 10%;
}
.leftl {
  left: 10%;
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, #747474 30%, #222424 70%);
}
.rightl {
  right: 10%;
  width: 1px;
  height: 100%;
}

`;

export default NumberCard;