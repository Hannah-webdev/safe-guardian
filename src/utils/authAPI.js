// Authentication API simulation functions
// This file contains the mock API functions for authentication

export const simulateLogin = async (email, password, role) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock users for demonstration - Realistic role-based accounts
  const mockUsers = [
    {
      id: 1,
      email: "john.doe@student.fulokoja.edu.ng",
      password: "password123",
      role: "student",
      name: "John Doe",
      studentId: "SCI20CSC001",
      department: "Computer Science",
      level: "400",
      phone: "+2348012345678",
    },
    {
      id: 2,
      email: "sarah.johnson@student.fulokoja.edu.ng",
      password: "student789",
      role: "student",
      name: "Sarah Johnson",
      studentId: "SCI20CSC003",
      department: "Computer Science",
      level: "200",
      phone: "+2348012345680",
    },
    {
      id: 3,
      email: "ahmed.ibrahim@staff.fulokoja.edu.ng",
      password: "security123",
      role: "security",
      name: "Ahmed Ibrahim",
      employeeId: "SEC001",
      department: "Security",
      position: "Senior Security Officer",
      phone: "+2348023456789",
    },
    {
      id: 4,
      email: "fatima.usman@staff.fulokoja.edu.ng",
      password: "security456",
      role: "security",
      name: "Fatima Usman",
      employeeId: "SEC002",
      department: "Security",
      position: "Security Supervisor",
      phone: "+2348023456790",
    },
    {
      id: 5,
      email: "admin@fulokoja.edu.ng",
      password: "admin123",
      role: "admin",
      name: "Dr. Adewumi S.E.",
      employeeId: "ADM001",
      department: "IT",
      position: "System Administrator",
      phone: "+2348034567890",
    },
  ];

  // Check both mock users and registered users
  const registeredUsers = JSON.parse(
    localStorage.getItem("registeredUsers") || "[]"
  );
  const allUsers = [...mockUsers, ...registeredUsers];

  const user = allUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    // Check if the user's role matches the selected role
    if (role && user.role !== role) {
      return {
        success: false,
        message: `Please select the correct role. This account is for ${user.role}s.`,
      };
    }

    const { password: _password, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  } else {
    return { success: false, message: "Invalid email or password" };
  }
};

export const simulateRegister = async (userData) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Basic validation
  if (!userData.email || !userData.password || !userData.name) {
    return { success: false, message: "All fields are required" };
  }

  if (userData.password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters",
    };
  }

  // Check if email already exists (simulate)
  const existingUsers = JSON.parse(
    localStorage.getItem("registeredUsers") || "[]"
  );
  if (existingUsers.find((u) => u.email === userData.email)) {
    return { success: false, message: "Email already registered" };
  }

  // Add new user with proper role handling
  const newUser = {
    id: Date.now(),
    ...userData,
    role: userData.role || "student", // Use selected role
    createdAt: new Date().toISOString(),
  };

  existingUsers.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

  return { success: true };
};
