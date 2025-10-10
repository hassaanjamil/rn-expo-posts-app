import { StyleSheet } from 'react-native';

export const postDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    marginBottom: 20,
  },
  userCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
  },
  userTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  userInfo: {
    fontSize: 14,
    marginBottom: 2,
    marginStart: 5
  },
  button: {
    alignSelf: 'center',
    minWidth: 120,
  },
});
