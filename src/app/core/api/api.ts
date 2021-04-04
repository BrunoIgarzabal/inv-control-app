export interface APIInfo {
    name: string;
    version: string;
}

export interface APIStatus {
    status: STATUS,
}

enum STATUS {
    UP,
    DOWN
}