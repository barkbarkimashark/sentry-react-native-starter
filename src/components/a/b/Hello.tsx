import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as Sentry from '@sentry/react-native';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const Hello: React.FC<Props> = ({name, baseEnthusiasmLevel = 0}) => {
  const [enthusiasmLevel, setEnthusiasmLevel] =
    React.useState(baseEnthusiasmLevel);

  const onIncrement = () => {
    setEnthusiasmLevel(enthusiasmLevel + 1);
    Sentry.captureMessage('onIncrement - called');
  };
  const onDecrement = () => {
    setEnthusiasmLevel(enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0);
    Sentry.captureMessage('onDecrement - called');
  };

  const onThrowCaught = () => {
    Sentry.captureException(new Error('caught exception captured'));
  };

  const onThrowUncaught = () => {
    throw new Error('uncaught exception');
  };

  const onNativeCrash = () => {
    Sentry.nativeCrash();
  };

  const getExclamationMarks = (numChars: number) =>
    numChars > 0 ? Array(numChars + 1).join('!') : '';

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hello {name}
        {getExclamationMarks(enthusiasmLevel)}
      </Text>
      <View>
        <Button
          title="Increase enthusiasm"
          accessibilityLabel="increment"
          onPress={onIncrement}
          color="blue"
        />
        <Button
          title="Decrease enthusiasm"
          accessibilityLabel="decrement"
          onPress={onDecrement}
          color="red"
        />
        <Button
          title="Throw caught error"
          accessibilityLabel="caught"
          onPress={onThrowCaught}
          color="red"
        />
        <Button
          title="Throw uncaught error"
          accessibilityLabel="uncaught"
          onPress={onThrowUncaught}
          color="red"
        />
        <Button
          title="Native crash"
          accessibilityLabel="crash"
          onPress={onNativeCrash}
          color="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default Hello;
