import cls from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={cls.sidebar}>
      <nav>
        <a href="#">Home</a>
        <a href="#">Video</a>
        <a href="#">Profile</a>
      </nav>
    </aside>
  );
}
