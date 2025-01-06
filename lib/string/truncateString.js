function truncateString(name, maxLength) {
    if(name && maxLength)

    if (name?.length <= maxLength) {
        return name; // No truncation needed
    }

    // Slice the string to the max length
    let truncated = name.slice(0, maxLength);

    // Find the last space within the sliced portion
    let lastSpaceIndex = truncated.lastIndexOf(' ');

    // Truncate at the last space if one exists
    if (lastSpaceIndex > -1) {
        truncated = truncated.slice(0, lastSpaceIndex);
    }

    return truncated;
}

export {truncateString}