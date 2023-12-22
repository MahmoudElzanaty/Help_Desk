class Ticket {
    constructor(priority, category) {
        this.priority = priority;
        this.category = category;
        this.state = 'open';
    }
}


class Agent {
    constructor(category, maxCapacity, softwarePercentage, hardwarePercentage, networkPercentage) {
        this.category = category;
        this.maxCapacity = maxCapacity;
        this.currentLoad = [];
        this.softwarePercentage = softwarePercentage;
        this.hardwarePercentage = hardwarePercentage;
        this.networkPercentage = networkPercentage;
    }

    isAvailable() {
        return this.currentLoad.length < this.maxCapacity;
    }

}

class TicketSystem {
    constructor() {
        this.agents = {};
        this.priorityQueues = {
            'High': {'Software': [], 'Hardware': [], 'Network': []},
            'Medium': {'Software': [], 'Hardware': [], 'Network': []},
            'Low': {'Software': [], 'Hardware': [], 'Network': []}
        };
    }


}

const ticketSystem = new TicketSystem();

// Initialize agents from the database
ticketSystem.initializeAgents().then(() => {
    // Simulate receiving tickets
    ticketSystem.receiveTicket('High', 'Software');
    ticketSystem.receiveTicket('High', 'Hardware');
    ticketSystem.receiveTicket('High', 'Network');
    ticketSystem.receiveTicket('High', 'Network');
    ticketSystem.receiveTicket('High', 'Software');
    ticketSystem.receiveTicket('Medium', 'Software');
    ticketSystem.receiveTicket('Medium', 'Network');
    ticketSystem.receiveTicket('Medium', 'Hardware');
    ticketSystem.receiveTicket('Medium', 'Hardware');
});