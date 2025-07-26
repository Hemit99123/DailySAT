export function divideIntoGroups(emails: string[], numGroups: number): Record<string, string[]> {
    const groups: Record<string, string[]> = {};
    for (let i = 0; i < numGroups; i++) {
        groups[`Group${i + 1}`] = [];
    }

    emails.forEach((email, index) => {
        const groupIndex = index % numGroups;
        groups[`Group${groupIndex + 1}`].push(email);
    });

    return groups;
}
