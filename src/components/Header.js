import React from 'react';
import {Appbar} from 'react-native-paper';

const Header = ({scene, previous, navigation}) => {
  const {options} = scene.descriptor;

  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  const rightIcons = options.rightIcons ? options.rightIcons : [];

  return (
    <Appbar.Header>
      {previous && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={title} />
      {rightIcons.map(({navTo, ...props}, i) => (
        <Appbar.Action
          key={`action-${i}`}
          {...props}
          onPress={() => navigation.navigate(navTo)}
        />
      ))}
    </Appbar.Header>
  );
};

export default Header;
