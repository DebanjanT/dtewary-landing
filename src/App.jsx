import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Contact from "./pages/contact";
import About from "./pages/about";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UILayout from "./pages/ui/layout";
import AccordionDoc from "./pages/ui/accordion";
import AlertDoc from "./pages/ui/alert";
import CalendarDoc from "./pages/ui/calendar";
import CheckboxDoc from "./pages/ui/checkbox";
import DatePickerDoc from "./pages/ui/datepicker";
import DialogDoc from "./pages/ui/dialog";
import DrawerDoc from "./pages/ui/drawer";
import InputOTPDoc from "./pages/ui/inputotp";
import PaginationDoc from "./pages/ui/pagination";
import SelectDoc from "./pages/ui/select";
import SwitchDoc from "./pages/ui/switch";
import ToggleDoc from "./pages/ui/toggle";
import TooltipDoc from "./pages/ui/tooltip";
import UIPage from "./pages/ui";
import InvoicePage from "./pages/invoice";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/oss/invoice" element={<InvoicePage />} />

        {/* UI Documentation Routes */}
        <Route path="/oss/web-components" element={<UILayout />}>
          <Route index element={<AccordionDoc />} />
          <Route path="accordion" element={<AccordionDoc />} />
          <Route path="alert" element={<AlertDoc />} />
          <Route path="calendar" element={<CalendarDoc />} />
          <Route path="checkbox" element={<CheckboxDoc />} />
          <Route path="datepicker" element={<DatePickerDoc />} />
          <Route path="dialog" element={<DialogDoc />} />
          <Route path="drawer" element={<DrawerDoc />} />
          <Route path="inputotp" element={<InputOTPDoc />} />
          <Route path="pagination" element={<PaginationDoc />} />
          <Route path="select" element={<SelectDoc />} />
          <Route path="switch" element={<SwitchDoc />} />
          <Route path="toggle" element={<ToggleDoc />} />
          <Route path="tooltip" element={<TooltipDoc />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
