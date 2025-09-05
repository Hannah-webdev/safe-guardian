// Sample Data Generator for Safe Guardian Application
// Federal University, Lokoja

export const generateSampleUsers = () => {
  const departments = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Geology",
    "Statistics",
    "Biochemistry",
    "Microbiology",
    "Industrial Chemistry",
  ];

  const levels = ["100", "200", "300", "400", "500"];
  const firstNames = [
    "John",
    "Alice",
    "Bob",
    "Carol",
    "David",
    "Emma",
    "Frank",
    "Grace",
    "Henry",
    "Ivy",
    "Jack",
    "Kate",
    "Liam",
    "Maya",
    "Noah",
    "Olivia",
    "Paul",
    "Quinn",
    "Ryan",
    "Sarah",
    "Tom",
    "Uma",
    "Victor",
    "Wendy",
    "Xavier",
    "Yara",
    "Zoe",
    "Ade",
    "Bola",
    "Chidi",
    "Dami",
    "Emeka",
    "Fatima",
    "Gabriel",
    "Hassan",
    "Ibrahim",
    "Jumoke",
    "Kemi",
    "Lola",
  ];
  const lastNames = [
    "Johnson",
    "Smith",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Ramirez",
    "Lewis",
    "Robinson",
    "Walker",
    "Young",
    "Allen",
    "King",
    "Wright",
    "Scott",
    "Torres",
    "Nguyen",
    "Hill",
    "Flores",
    "Green",
    "Adams",
    "Nelson",
    "Baker",
    "Hall",
    "Rivera",
    "Campbell",
    "Mitchell",
    "Carter",
    "Roberts",
    "Adebayo",
    "Okafor",
    "Ibrahim",
    "Mohammed",
    "Oluwaseun",
    "Chinedu",
    "Aisha",
    "Blessing",
    "Emmanuel",
    "Grace",
  ];

  const users = [];

  // Generate 50 sample students
  for (let i = 1; i <= 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const department =
      departments[Math.floor(Math.random() * departments.length)];
    const level = levels[Math.floor(Math.random() * levels.length)];

    users.push({
      id: i,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@fulokoja.edu.ng`,
      studentId: `SCI20CSC${String(i).padStart(3, "0")}`,
      department: department,
      level: level,
      role: "student",
      phone: `+234${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      status: Math.random() > 0.1 ? "active" : "inactive",
      createdAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      lastLogin: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    });
  }

  // Add security personnel
  users.push(
    {
      id: 51,
      name: "Security Officer Alpha",
      email: "security.alpha@fulokoja.edu.ng",
      employeeId: "SEC001",
      department: "Security",
      role: "security",
      phone: "+2348031234567",
      status: "active",
      createdAt: new Date().toISOString(),
      lastLogin: new Date(
        Date.now() - Math.random() * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
    {
      id: 52,
      name: "Security Officer Beta",
      email: "security.beta@fulokoja.edu.ng",
      employeeId: "SEC002",
      department: "Security",
      role: "security",
      phone: "+2348031234568",
      status: "active",
      createdAt: new Date().toISOString(),
      lastLogin: new Date(
        Date.now() - Math.random() * 24 * 60 * 60 * 1000
      ).toISOString(),
    }
  );

  // Add admin
  users.push({
    id: 53,
    name: "System Administrator",
    email: "admin@fulokoja.edu.ng",
    employeeId: "ADM001",
    department: "IT",
    role: "admin",
    phone: "+2348031234569",
    status: "active",
    createdAt: new Date().toISOString(),
    lastLogin: new Date(
      Date.now() - Math.random() * 24 * 60 * 60 * 1000
    ).toISOString(),
  });

  return users;
};

export const generateSampleEmergencyAlerts = (users) => {
  const emergencyMessages = [
    "Feeling unsafe near the library area",
    "Someone is following me",
    "Medical emergency - need immediate assistance",
    "Suspicious activity near hostel block A",
    "Lost and need help finding my way",
    "Feeling threatened by unknown person",
    "Accident occurred near the main gate",
    "Fire alarm - need evacuation assistance",
    "Theft incident - my belongings were stolen",
    "Feeling dizzy and need medical help",
    "Stuck in elevator - need rescue",
    "Harassment incident - need security intervention",
    "Power outage in my area - need assistance",
    "Water leak in hostel - need maintenance",
    "Noise disturbance - need security to investigate",
    "Quick emergency alert - immediate assistance needed",
    "Feeling unsafe walking alone at night",
    "Suspicious package found - need bomb squad",
    "Student fight in progress - need intervention",
    "Car accident in parking lot - need help",
  ];

  const statuses = ["pending", "in_progress", "resolved", "cancelled"];
  const statusWeights = [0.1, 0.2, 0.6, 0.1]; // More resolved alerts

  const alerts = [];
  const studentUsers = users.filter((user) => user.role === "student");

  // Generate 100 sample emergency alerts
  for (let i = 1; i <= 100; i++) {
    const user = studentUsers[Math.floor(Math.random() * studentUsers.length)];
    const message =
      emergencyMessages[Math.floor(Math.random() * emergencyMessages.length)];
    const status = getWeightedRandomStatus(statuses, statusWeights);
    const timestamp = new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ); // Last 30 days
    const silent = Math.random() > 0.7; // 30% silent alerts

    const alert = {
      id: i,
      userId: user.id,
      userName: user.name,
      studentId: user.studentId,
      location: {
        lat: 7.8024 + (Math.random() - 0.5) * 0.01, // Around FULokoja coordinates
        lng: 6.743 + (Math.random() - 0.5) * 0.01,
      },
      message: message,
      timestamp: timestamp.toISOString(),
      status: status,
      silent: silent,
    };

    // Add response data for resolved/in-progress alerts
    if (status === "resolved" || status === "in_progress") {
      const responseTime = Math.floor(Math.random() * 20) + 1; // 1-20 minutes
      alert.responseTime = `${responseTime} minutes`;
      alert.respondedBy = "Security Officer Alpha";
      alert.respondedAt = new Date(
        timestamp.getTime() + responseTime * 60 * 1000
      ).toISOString();

      if (status === "resolved") {
        alert.securityNotes = generateSecurityNotes(message, status);
      }
    }

    alerts.push(alert);
  }

  return alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

const getWeightedRandomStatus = (statuses, weights) => {
  const random = Math.random();
  let cumulativeWeight = 0;

  for (let i = 0; i < statuses.length; i++) {
    cumulativeWeight += weights[i];
    if (random <= cumulativeWeight) {
      return statuses[i];
    }
  }

  return statuses[statuses.length - 1];
};

const generateSecurityNotes = (message, status) => {
  const notes = [
    "Incident resolved. Student was safe and no further action needed.",
    "Security patrol dispatched. Area cleared and secured.",
    "Medical assistance provided. Student received necessary care.",
    "False alarm. Student was testing the system.",
    "Situation de-escalated. No threats found in the area.",
    "Student escorted to safety. Incident documented.",
    "Emergency services contacted. Situation under control.",
    "Investigation completed. No criminal activity found.",
    "Student provided with safety guidance. Case closed.",
    "Follow-up scheduled with student affairs office.",
  ];

  return notes[Math.floor(Math.random() * notes.length)];
};

export const generateSampleEmergencyContacts = (users) => {
  const relationships = [
    "Parent",
    "Guardian",
    "Sibling",
    "Friend",
    "Roommate",
    "Classmate",
  ];
  const studentUsers = users.filter((user) => user.role === "student");
  const contacts = [];

  studentUsers.forEach((user, index) => {
    // Each student has 2-4 emergency contacts
    const contactCount = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < contactCount; i++) {
      const relationship =
        relationships[Math.floor(Math.random() * relationships.length)];
      const isPrimary = i === 0; // First contact is primary

      contacts.push({
        id: `${user.id}_${i}`,
        userId: user.id,
        name: `Contact ${i + 1} for ${user.name}`,
        phone: `+234${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: `contact${i + 1}${user.id}@example.com`,
        relationship: relationship,
        isPrimary: isPrimary,
        createdAt: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
        ).toISOString(),
      });
    }
  });

  return contacts;
};

export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    console.error("No data to export");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          // Handle values that might contain commas or quotes
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"'))
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateAllSampleData = () => {
  const users = generateSampleUsers();
  const emergencyAlerts = generateSampleEmergencyAlerts(users);
  const emergencyContacts = generateSampleEmergencyContacts(users);

  // Store in localStorage
  localStorage.setItem("sampleUsers", JSON.stringify(users));
  localStorage.setItem("emergencyAlerts", JSON.stringify(emergencyAlerts));
  localStorage.setItem("emergencyContacts", JSON.stringify(emergencyContacts));

  return {
    users,
    emergencyAlerts,
    emergencyContacts,
  };
};

export const exportAllDataToCSV = () => {
  const users = JSON.parse(localStorage.getItem("sampleUsers") || "[]");
  const emergencyAlerts = JSON.parse(
    localStorage.getItem("emergencyAlerts") || "[]"
  );
  const emergencyContacts = JSON.parse(
    localStorage.getItem("emergencyContacts") || "[]"
  );

  if (users.length > 0) {
    exportToCSV(users, "safe-guardian-users.csv");
  }

  if (emergencyAlerts.length > 0) {
    exportToCSV(emergencyAlerts, "safe-guardian-emergency-alerts.csv");
  }

  if (emergencyContacts.length > 0) {
    exportToCSV(emergencyContacts, "safe-guardian-emergency-contacts.csv");
  }
};

// Campus locations data
export const campusLocations = [
  {
    id: 1,
    name: "Main Gate",
    type: "entrance",
    coordinates: { lat: 7.8024, lng: 6.743 },
    description: "Main entrance to Federal University, Lokoja",
    facilities: ["Security Post", "Visitor Center"],
  },
  {
    id: 2,
    name: "Library",
    type: "academic",
    coordinates: { lat: 7.8025, lng: 6.7431 },
    description: "University Central Library",
    facilities: ["Reading Rooms", "Computer Lab", "Study Areas"],
  },
  {
    id: 3,
    name: "Admin Block",
    type: "administrative",
    coordinates: { lat: 7.8023, lng: 6.7429 },
    description: "Administrative offices and student affairs",
    facilities: ["Registrar Office", "Student Affairs", "Bursary"],
  },
  {
    id: 4,
    name: "Health Center",
    type: "medical",
    coordinates: { lat: 7.8026, lng: 6.7432 },
    description: "University Health Center",
    facilities: ["Emergency Care", "Pharmacy", "Consultation Rooms"],
  },
  {
    id: 5,
    name: "Hostel Block A",
    type: "residential",
    coordinates: { lat: 7.8022, lng: 6.7428 },
    description: "Male students hostel",
    facilities: ["Common Room", "Laundry", "Security Post"],
  },
  {
    id: 6,
    name: "Hostel Block B",
    type: "residential",
    coordinates: { lat: 7.8027, lng: 6.7433 },
    description: "Female students hostel",
    facilities: ["Common Room", "Laundry", "Security Post"],
  },
  {
    id: 7,
    name: "Computer Center",
    type: "academic",
    coordinates: { lat: 7.8021, lng: 6.7427 },
    description: "IT Services and Computer Labs",
    facilities: ["Computer Labs", "IT Help Desk", "Network Center"],
  },
  {
    id: 8,
    name: "Cafeteria",
    type: "dining",
    coordinates: { lat: 7.8028, lng: 6.7434 },
    description: "Student dining hall",
    facilities: ["Food Court", "Kitchen", "Seating Area"],
  },
];

export default {
  generateSampleUsers,
  generateSampleEmergencyAlerts,
  generateSampleEmergencyContacts,
  generateAllSampleData,
  exportToCSV,
  exportAllDataToCSV,
  campusLocations,
};
