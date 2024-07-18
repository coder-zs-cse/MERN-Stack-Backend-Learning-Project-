const userMenu = [
  {
    name: "Home",
    path: "/home",
    icon: "ri-home-line mt-auto mb-auto",
  },
  {
    name: "Find a Doctor",
    path: "/doctors",
    icon: "ri-file-list-line mt-auto mb-auto ",
  },
  {
    name: "My Appointments",
    path: "/user-appointments",
    icon: "ri-file-list-line mt-auto mb-auto",
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "ri-user-line mt-auto mb-auto",
  },
];

const doctorMenu = [
  {
    name: "Home",
    path: "/home",
    icon: "ri-home-line mt-auto mb-auto",
  },
  {
    name: "Book an Appointment",
    path: "/book-appointment",
    icon: "ri-file-list-line mt-auto mb-auto ",
  },
  {
    name: "My Appointments",
    path: "/user-appointments",
    icon: "ri-file-list-line mt-auto mb-auto",
  },
  {
    name: "Profile",
    path: "/doctor/profile",
    icon: "ri-user-line mt-auto mb-auto",
  },
];

const adminMenu = [
  {
    name: "Home",
    path: "/home",
    icon: "ri-home-line mt-auto mb-auto",
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: "ri-file-list-line mt-auto mb-auto",
  },
  {
    name: "Newsletter",
    path: "/admin/newsletter",
    icon: "ri-mail-send-line mt-auto mb-auto",
  },
  {
    name: "Assistant",
    path: "/admin/assistant",
    icon: "ri-message-2-line mt-auto mb-auto",
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "ri-user-line mt-auto mb-auto",
  },
];
const getMenuForRole = (role) => {
  switch (role) {
    case "admin":
      return adminMenu;
    case "doctor":
      return doctorMenu;
    case "patient":
      return userMenu;
    default:
      return userMenu; // Default to patient menu if role is unknown
  }
};

export { userMenu, doctorMenu, adminMenu, getMenuForRole };
