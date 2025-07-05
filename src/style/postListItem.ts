import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pliContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  pliTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  pliBody: {
    fontSize: 14,
    marginBottom: 12,
    color: '#666',
  },
  pliButton: {
    alignSelf: 'flex-end',
    minWidth: 120,
  },
});