import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Card, Caption, Colors} from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ListingCard = ({
  propertyDetails: {streetNumber, street, suburb, bedrooms, bathrooms},
  media,
}) => {
  const imageUri =
    media[0] && media[0].category === 'Image' ? media[0].url : undefined;
  return (
    <Card style={styles.card}>
      <Card.Cover source={{uri: imageUri}} />
      <Card.Title title={`${streetNumber} ${street}`} subtitle={suburb} />
      {Platform.OS === 'ios' && (
        <Card.Content style={styles.content}>
          <MaterialCommunityIcon
            name="bed-empty"
            size={16}
            color={Colors.grey500}
            style={styles.icon}
          />
          <Caption style={styles.caption}>{bedrooms}</Caption>
          <MaterialCommunityIcon
            name="water-pump"
            size={16}
            color={Colors.grey500}
            style={styles.icon}
          />
          <Caption style={styles.caption}>{bathrooms}</Caption>
        </Card.Content>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginVertical: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  caption: {
    marginRight: 16,
  },
});

export default ListingCard;
