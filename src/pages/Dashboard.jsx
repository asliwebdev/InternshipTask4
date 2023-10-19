import { Header, ActionButtonsGroup, UsersTable } from "../components";

const Dashboard = () => {

  return (
    <section className="h-screen">
       <Header />
       <div className="mt-6 mx-auto max-w-6xl px-2">
          <ActionButtonsGroup />
          <UsersTable />
       </div>
    </section>
  )
}

export default Dashboard