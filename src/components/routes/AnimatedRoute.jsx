import { motion } from 'framer-motion'

const AnimatedRoute = ({ children }) => {
  return (
    <motion.div
        initial={{ x: '100vw' }}
        animate={{ x: 0 }}
        exit={{ x: '100vw' }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
  )
}

export default AnimatedRoute