import React, { useState } from "react";
import { Button, Modal, InputGroup, FormControl, Form, FormControlProps } from "react-bootstrap";
import { IGameStatePlayer } from "@monopoly-money/game-state";
import { ReplaceProps, BsPrefixProps } from "react-bootstrap/helpers";

interface IRenamePlayerModalProps {
  player: IGameStatePlayer;
  proposePlayerNameChange: (playerId: string, name: string) => void;
  onClose: () => void;
}

const RenamePlayerModal: React.FC<IRenamePlayerModalProps> = ({
  player,
  proposePlayerNameChange,
  onClose
}) => {
  const [name, setName] = useState(player.name);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = () => {
    if (name === "") {
      setSubmitError("Name must not be empty");
    } else {
      setSubmitError(null);
    }
    proposePlayerNameChange(player.playerId, name);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Player Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={name}
            onChange={(
              e: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>>
            ) => setName(e.currentTarget.value ?? "")}
          />
          <Button variant="success" onClick={submit} className="remove-left-border-radius">
            Rename
          </Button>
        </InputGroup>
        <Form.Text style={{ color: "var(--danger)" }}>{submitError}</Form.Text>
      </Modal.Body>
    </Modal>
  );
};

export default RenamePlayerModal;
