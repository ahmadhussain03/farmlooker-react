import * as React from "react"
import { motion } from 'framer-motion'

function MenuIcon(props) {

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
        d="M4 6h16M4 12h16M4 18h16"
      />
    </motion.svg>
  )
}

export default MenuIcon
