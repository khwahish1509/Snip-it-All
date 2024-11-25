#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>

class Graph {
public:
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u); // For undirected graph
    }

    void BFS(int start) const {
        std::unordered_map<int, bool> visited;
        std::queue<int> q;

        visited[start] = true;
        q.push(start);

        while (!q.empty()) {
            int node = q.front();
            q.pop();
            std::cout << node << " ";

            for (int neighbor : adj.at(node)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
    }

private:
    std::unordered_map<int, std::vector<int>> adj; // Adjacency list
};

int main() {
    Graph g;
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 3);

    std::cout << "BFS starting from node 0: ";
    g.BFS(0);

    return 0;
}


// Explanation
// Unordered Map of Vectors: Represents the adjacency list for efficient edge lookups.
// Queue: Used in BFS to explore nodes level by level.