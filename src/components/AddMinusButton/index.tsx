import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

import styles from './AddMinusButton.style';

const AddMinusButton = (props: any) => {
  const { colors } = useTheme();
  const [count, setCount] = useState(0);

  const onAdd = () => {
    const countVal = count + 1;
    setCount(countVal);
    props.updateCount({ count: countVal });
  };
  const onMinus = () => {
    if (count > 0) {
      const countVal = count - 1;
      setCount(countVal);
      props.updateCount({ count: countVal });
    }
  };

  useEffect(() => {
    setCount(props?.count ? props?.count : 0);
  }, []);

  return (
    <View style={props.style}>
      <View style={styles.buttons}>
        <IconButton
          icon="minus"
          color={colors.text}
          size={20}
          rippleColor={colors.accent}
          onPress={onMinus}
        />
      </View>
      <View style={[styles.countText, { backgroundColor: colors.text }]}>
        <Text style={styles.text} theme={{ colors: { text: colors.primary } }}>
          {count}
        </Text>
      </View>
      <View style={styles.buttons}>
        <IconButton
          icon="plus"
          color={colors.text}
          size={20}
          rippleColor={colors.accent}
          onPress={onAdd}
        />
      </View>
    </View>
  );
};

export default AddMinusButton;
