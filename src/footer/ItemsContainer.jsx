import Item from "./Item";
import { PRODUCTS, RESOURCES, COMPANY, SUPPORT } from "./Menus";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <Item Links={PRODUCTS} title="SKILL SYNC" />
      <Item Links={RESOURCES} title="SUPPORT" />
      <Item Links={COMPANY} title="COMPANY" />
      <Item Links={SUPPORT} title="CONTACT US" />
    </div>
  );
};

export default ItemsContainer;