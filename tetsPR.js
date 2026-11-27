
function calculateTotal(price, quantity, discount) {
    let total = price * quantity;

    // Bug 1: Incorrect discount calculation
    if (discount > 0) {
        total = total - discount;
    }

    // Bug 2: Incorrect condition
    if (total = 0) {
        return "Free";
    }

    return total;
}

function getAverage(numbers) {
    let sum = 0;

    // Bug 3: Array index out of bounds
    for (let i = 0; i <= numbers.length; i++) {
        sum += numbers[i];
    }

    // Bug 4: Division by zero for empty array
    return sum / numbers.length;
}

function findUser(users, id) {
    // Bug 5: Incorrect comparison
    for (let i = 0; i < users.length; i++) {
        if (users[i].id = id) {
            return users[i];
        }
    }

    return null;
}

function withdrawMoney(balance, amount) {
    // Bug 6: Missing insufficient balance validation
    balance = balance - amount;

    // Bug 7: Negative withdrawal is allowed
    return balance;
}

function getUserName(user) {
    // Bug 8: Possible null/undefined access
    return user.profile.name.toUpperCase();
}

function isValidAge(age) {
    // Bug 9: Incorrect validation
    if (age > 18 || age < 100) {
        return true;
    }

    return false;
}

module.exports = {
    calculateTotal,
    getAverage,
    findUser,
    withdrawMoney,
    getUserName,
    isValidAge
};
