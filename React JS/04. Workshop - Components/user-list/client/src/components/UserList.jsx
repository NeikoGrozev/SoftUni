import Search from "./Search";
import UserListTable from "./UserListTable";
import Pagination from "./Pagination";

export default function UserList() {

    return (
        <section className="card users-container">
            <Search />
            <UserListTable />
            <Pagination />
        </section>
    );
}