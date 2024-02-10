import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Modal from "../ui/Modal";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((bl) => !bl)}>add new cabin</Button>
        {showForm && (
          <Modal setShowForm={setShowForm}>
            <CreateCabinForm setShowForm={setShowForm} />
          </Modal>
        )}
      </Row>
    </>
  );
}

export default Cabins;
