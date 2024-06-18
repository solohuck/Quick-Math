import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { routes } from "../typeScript/routes";

export const NavbarMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div className="lg:hidden">
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ul>
            {routes.map((route) => {
              const { Icon } = route;

              return (
                <motion.li
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1 + idx / 10,
                  }}
                  key={route.title}
                >
                  <Link onClick={() => setOpen((prev) => !prev)} to={route.to}>
                    <span>{route.title}</span>
                    <Icon />
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      )}
      <AnimatePresence />
    </div>
  );
};
