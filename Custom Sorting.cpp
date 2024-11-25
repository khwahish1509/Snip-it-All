#include <iostream>
#include <queue>
#include <vector>

struct Task {
    int id;
    int priority;

    bool operator<(const Task& other) const {
        return priority < other.priority; // Max-heap based on priority
    }
};

int main() {
    std::priority_queue<Task> taskQueue;

    taskQueue.push({1, 5});
    taskQueue.push({2, 3});
    taskQueue.push({3, 8});

    while (!taskQueue.empty()) {
        Task task = taskQueue.top();
        taskQueue.pop();
        std::cout << "Processing task ID: " << task.id << " with priority: " << task.priority << std::endl;
    }

    return 0;
}

// Explanation
// Custom Comparator: Defined in operator< to prioritize tasks based on their priority.
// Priority Queue: Manages tasks efficiently by always processing the highest priority task first.