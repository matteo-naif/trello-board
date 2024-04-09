export function getStatusColor(str: string) {

    switch (str) {
        case "Backlog":
            return "#f77189"
        case "Waiting / Blocked":
            return "#db9834"
        case "Customer testing":
            return "#acc03b"
        case "Sprint in corso":
            return "#33bb9f"
        case "Progress":
            return "#33a1c9"
        case "Done":
            return "#8c67bf"
        case "Internal testing":
            return "#e94e77"
        default:
            return "#ffffff";
    }


}