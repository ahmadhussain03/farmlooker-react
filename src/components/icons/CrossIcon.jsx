import * as React from "react"

import { AnimatePresence, motion } from "framer-motion"

const svgVariant = {
  initial: {
    opacity: 0,
    rotate: 180,
    transition: {
      duration: 1
    }
  },
  animate: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 1
    }
  },
  exit: {
    opacity: 0,
    rotate: 180,
    transition: {
      duration: 1
    }
  }    
}

function CrossIcon(props) {
  return (
    <motion.svg
      initial={{rotate: 180}}
      animate={{rotate: 0}}
      exit={{rotate: 180}}
      transition={{duration: 0.5}}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        exit={{ pathLength: 0, opacity: 0 }}
        transition={{ duration: 1 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </motion.svg>
  )
}

export default CrossIcon
