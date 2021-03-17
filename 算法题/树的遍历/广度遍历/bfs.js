function bfs(node) {
    const queue = [node];
    while(queue.length > 0) {
        const first = queue.shift();
        console.log(first.key);
        first.children.forEach(
            child => queue.push(child)
        )
    }
}