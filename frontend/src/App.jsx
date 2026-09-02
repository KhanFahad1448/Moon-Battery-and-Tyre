import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ErrorBoundary from "@/components/site/ErrorBoundary";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";

import Home from "@/pages/Home";
import About from "@/pages/about";
import Account from "@/pages/account";
import BatteriesList from "@/pages/BatteriesList";
import BatteryDetail from "@/pages/BatteryDetail";
import BatteryFinder from "@/pages/battery-finder";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";
import Booking from "@/pages/booking";
import Brands from "@/pages/brands";
import Careers from "@/pages/careers";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import Contact from "@/pages/contact";
import Faq from "@/pages/faq";
import Fleet from "@/pages/fleet";
import Franchise from "@/pages/franchise";
import Gallery from "@/pages/gallery";
import Locations from "@/pages/locations";
import Login from "@/pages/login";
import Offers from "@/pages/offers";
import Privacy from "@/pages/privacy";
import Register from "@/pages/register";
import Roadside from "@/pages/roadside";
import ServicesList from "@/pages/ServicesList";
import ServiceDetail from "@/pages/ServiceDetail";
import Terms from "@/pages/terms";
import Testimonials from "@/pages/testimonials";
import TyreFinder from "@/pages/tyre-finder";
import TyresList from "@/pages/TyresList";
import TyreDetail from "@/pages/TyreDetail";
import Warranty from "@/pages/warranty";
import NotFound from "@/pages/NotFound";
import AdminPage from "@/pages/Admin";


function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/batteries" element={<BatteriesList />} />
          <Route path="/batteries/:slug" element={<BatteryDetail />} />
          <Route path="/battery-finder" element={<BatteryFinder />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/roadside" element={<Roadside />} />
          <Route path="/services" element={<ServicesList />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/tyre-finder" element={<TyreFinder />} />
          <Route path="/tyres" element={<TyresList />} />
          <Route path="/tyres/:slug" element={<TyreDetail />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/admin" element={<AdminPage />} />           
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
        <WhatsAppButton />
        <Toaster />
      </StoreProvider>
    </ErrorBoundary>
  );
}

export default App;