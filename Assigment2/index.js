const bank = {
  bankName: "OpenAI National Bank",
  accounts: [],
  nextAccountNumber: 1001,

  // ============================================
  // Create New Account
  // ============================================
  createAccount: function (name, type) {
    if (type !== "savings" && type !== "current") {
      console.log(" Invalid Account Type! Choose savings/current.");
      return;
    }

    const newAccount = {
      accountNumber: this.nextAccountNumber++,
      name: name,
      type: type,
      balance: type === "savings" ? 1000 : 0, // Savings min balance
      loan: 0,
      transactions: [],
    };

    newAccount.transactions.push({
      type: "Account Created",
      amount: newAccount.balance,
    });

    this.accounts.push(newAccount);

    console.log(
      ` Account Created: ${name} (${type}) | Acc No: ${newAccount.accountNumber}`
    );
  },

  // ============================================
  // Find Account by Account Number
  // ============================================
  findAccount: function (accNumber) {
    return this.accounts.find((acc) => acc.accountNumber === accNumber);
  },

  // ============================================
  // Deposit Money
  // ============================================
  deposit: function (accNumber, amount) {
    const account = this.findAccount(accNumber);

    if (!account) {
      console.log(" Account Not Found!");
      return;
    }

    if (amount <= 0) {
      console.log(" Deposit must be greater than 0.");
      return;
    }

    account.balance += amount;

    account.transactions.push({
      type: "Deposit",
      amount: amount,
    });

    console.log(
      ` Deposit Successful: ₹${amount} added to Acc No ${accNumber}`
    );
  },

  // ============================================
  // Withdraw Money
  // ============================================
  withdraw: function (accNumber, amount) {
    const account = this.findAccount(accNumber);

    if (!account) {
      console.log(" Account Not Found!");
      return;
    }

    if (amount <= 0) {
      console.log(" Withdrawal must be greater than 0.");
      return;
    }

    // Savings minimum balance check
    if (
      account.type === "savings" &&
      account.balance - amount < 1000
    ) {
      console.log(" Savings account must maintain minimum ₹1000 balance.");
      return;
    }

    if (amount > account.balance) {
      console.log(" Insufficient Balance!");
      return;
    }

    account.balance -= amount;

    account.transactions.push({
      type: "Withdraw",
      amount: amount,
    });

    console.log(` Withdrawal Successful: ₹${amount} from Acc No ${accNumber}`);
  },

  // ============================================
  // Transfer Money Between Accounts
  // ============================================
  transfer: function (fromAcc, toAcc, amount) {
    const sender = this.findAccount(fromAcc);
    const receiver = this.findAccount(toAcc);

    if (!sender || !receiver) {
      console.log(" Transfer Failed: Account not found!");
      return;
    }

    if (amount <= 0) {
      console.log(" Transfer amount must be greater than 0.");
      return;
    }

    if (amount > sender.balance) {
      console.log(" Transfer Failed: Insufficient Balance!");
      return;
    }

    // Withdraw from sender
    sender.balance -= amount;
    receiver.balance += amount;

    sender.transactions.push({
      type: "Transfer Sent",
      amount: amount,
      to: toAcc,
    });

    receiver.transactions.push({
      type: "Transfer Received",
      amount: amount,
      from: fromAcc,
    });

    console.log(` Transfer Successful: ₹${amount} from ${fromAcc} → ${toAcc}`);
  },

  // ============================================
  // Loan Feature
  // Maximum Loan = 5x Balance
  // ============================================
  applyLoan: function (accNumber, loanAmount) {
    const account = this.findAccount(accNumber);

    if (!account) {
      console.log(" Account Not Found!");
      return;
    }

    const maxLoan = account.balance * 5;

    if (loanAmount > maxLoan) {
      console.log(
        ` Loan Rejected! Max Loan Allowed: ₹${maxLoan}`
      );
      return;
    }

    account.loan += loanAmount;
    account.balance += loanAmount;

    account.transactions.push({
      type: "Loan Approved",
      amount: loanAmount,
    });

    console.log(
      ` Loan Approved: ₹${loanAmount} credited to Acc No ${accNumber}`
    );
  },

  // ============================================
  // Interest for Savings Account (4% yearly)
  // ============================================
  addInterest: function (accNumber) {
    const account = this.findAccount(accNumber);

    if (!account || account.type !== "savings") {
      console.log(" Interest only applies to Savings accounts.");
      return;
    }

    const interest = (account.balance * 4) / 100;
    account.balance += interest;

    account.transactions.push({
      type: "Interest Added",
      amount: interest,
    });

    console.log(
      ` Interest Added: ₹${interest} to Acc No ${accNumber}`
    );
  },

  // ============================================
  // Show All Accounts
  // ============================================
  showAllAccounts: function () {
    console.log("\n All Bank Accounts:");
    console.table(
      this.accounts.map((acc) => ({
        Account: acc.accountNumber,
        Name: acc.name,
        Type: acc.type,
        Balance: acc.balance,
        Loan: acc.loan,
      }))
    );
  },

  // ============================================
  // Bank Summary (Total Balance + Total Loans)
  // ============================================
  bankSummary: function () {
    const totalBalance = this.accounts.reduce(
      (sum, acc) => sum + acc.balance,
      0
    );

    const totalLoans = this.accounts.reduce(
      (sum, acc) => sum + acc.loan,
      0
    );

    console.log("\n BANK SUMMARY");
    console.log("=================================");
    console.log("Total Bank Balance:", totalBalance);
    console.log("Total Loans Given:", totalLoans);
    console.log("=================================");
  },

  // ============================================
  // Show Transaction History
  // ============================================
  showTransactions: function (accNumber) {
    const account = this.findAccount(accNumber);

    if (!account) {
      console.log(" Account Not Found!");
      return;
    }

    console.log(`\n Transaction History for Acc No ${accNumber}`);
    console.table(account.transactions);
  },
};

// =====================================================
// 🚀 AUTOMATIC DEMO RUN (When node index.js executed)
// =====================================================

console.log("\n Welcome to Console Banking System\n");

// Create Accounts
bank.createAccount("Vishal", "savings");
bank.createAccount("Rahul", "current");

// Deposit
bank.deposit(1001, 5000);

// Withdraw
bank.withdraw(1001, 2000);

// Transfer
bank.transfer(1001, 1002, 1000);

// Apply Loan
bank.applyLoan(1002, 3000);

// Add Interest
bank.addInterest(1001);

// Show Accounts
bank.showAllAccounts();

// Show Transactions
bank.showTransactions(1001);

// Bank Summary
bank.bankSummary();

console.log("\n Banking Application Finished Successfully!\n");
  