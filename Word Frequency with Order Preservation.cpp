#include <iostream>
#include <vector>
#include <unordered_map>
#include <list>

int main() {
    std::vector<std::string> words = {"apple", "banana", "apple", "orange", "banana", "apple"};
    std::unordered_map<std::string, std::pair<int, std::list<std::string>::iterator>> word_count;
    std::list<std::string> order;

    for (const auto& word : words) {
        if (word_count.find(word) == word_count.end()) {
            order.push_back(word);
            word_count[word] = {1, --order.end()};
        } else {
            word_count[word].first++;
        }
    }

    for (const auto& word : order) {
        std::cout << word << ": " << word_count[word].first << std::endl;
    }

    return 0;
}