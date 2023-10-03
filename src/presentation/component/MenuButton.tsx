import React, {PropsWithChildren, useState} from 'react';
import {Modal, Pressable, Text, View} from 'react-native';

function MenuButton<T>(props: {
  selected?: T;
  items: T[];
  onSelection: (value: T) => void;
}): React.JSX.Element {
  const [opened, setOpened] = useState(false);

  return (
    <View>
      <Modal visible={opened}>
        {props.items?.map(item => (
          <Pressable
            onPress={() => {
              props.onSelection(item);
              setOpened(false);
            }}>
            <MenuButtonItem value={item} />
          </Pressable>
        ))}
      </Modal>
      <Pressable onPress={() => setOpened(true)}>
        <MenuButtonItem value={props.selected} />
      </Pressable>
    </View>
  );
}

class MenuButtonItem<T> extends React.Component<PropsWithChildren<{value: T}>> {
  value: T;

  constructor(props: React.PropsWithChildren<{value: T}>) {
    super(props);
    this.value = props.value;
  }

  render(): React.ReactNode {
    return (
      <View>
        <Text>{this.props.value + ''}</Text>
      </View>
    );
  }
}

export {MenuButton, MenuButtonItem};
