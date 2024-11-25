#include <iostream>
#include <vector>
#include <algorithm>
#include <set>

struct Meeting {
    int start;
    int end;
};

int minMeetingRooms(std::vector<Meeting>& meetings) {
    // Sort meetings based on start time
    std::sort(meetings.begin(), meetings.end(), [](const Meeting& a, const Meeting& b) {
        return a.start < b.start;
    });

    // Multiset to track end times of ongoing meetings
    std::multiset<int> endTimes;

    for (const auto& meeting : meetings) {
        // Remove all meetings that have ended
        while (!endTimes.empty() && *endTimes.begin() <= meeting.start) {
            endTimes.erase(endTimes.begin());
        }

        // Add the current meeting's end time
        endTimes.insert(meeting.end);
    }

    // The size of the multiset is the number of rooms needed
    return endTimes.size();
}

int main() {
    std::vector<Meeting> meetings = {{0, 30}, {5, 10}, {15, 20}, {25, 35}};

    int result = minMeetingRooms(meetings);
    std::cout << "Minimum number of meeting rooms required: " << result << std::endl;

    return 0;
}


// Explanation
// Sorting: Meetings are sorted by start time to efficiently process them in chronological order.
// Multiset: Used to keep track of ongoing meetings by storing their end times. The multiset automatically keeps the end times sorted.
// Logic:
// For each meeting, remove all meetings from the multiset that have ended before the current meeting starts.
// Insert the current meeting's end time into the multiset.
// The size of the multiset at any point gives the number of concurrent meetings, which translates to the number of rooms needed.
// This approach efficiently calculates the minimum number of meeting rooms required by leveraging the properties of sorting and multisets, providing an elegant solution to this scheduling problem.