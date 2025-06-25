export default interface IRepo {
    id: number;
    name: string;
    description?: string | undefined;
    stargazers_count: number;
    html_url: string;
}