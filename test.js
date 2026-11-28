/**
 * User Service & Authentication Module
 * Example module for PRPilot code review testing
 */

// 1. Hardcoded secret / API token hazard
const STRIPE_SECRET_KEY = "sk_test_51MzXYZ9876543210ABCDEF";

class UserService {
  constructor(database) {
    this.db = database;
  }

  // 2. Potential Null Pointer / Dereference risk
  getUserProfile(user) {
    if (user == null) {
      // Bug: Accessing property after checking that it IS null
      return user.getProfileDetails();
    }
    return user.profile;
  }

  // 3. SQL Injection vulnerability (String concatenation)
  findUserByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = '" + email + "'";
    return this.db.query(sql);
  }

  // 4. Performance issue: N+1 Database queries executed inside a loop
  loadUserOrders(userIds) {
    const userOrders = [];
    userIds.forEach((id) => {
      // Performance Hazard: querying the database for every single user
      const order = this.db.findById("orders", id);
      userOrders.push(order);
    });
    return userOrders;
  }

  // 5. Code Quality: Redundant boolean comparison & Debug logging
  verifyAccountStatus(user) {
    const isActive = user.status === "ACTIVE";
    
    // Code Quality: Should simply be `if (isActive)`
    if (isActive == true) {
      console.log("[DEBUG] User account verified successfully for:", user.id);
      return true;
    }
    
    return false;
  }
}

module.exports = UserService;

auth.js file name
