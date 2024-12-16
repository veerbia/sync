import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface Exercise {
  id: string;
  name: string;
  sets: Array<{
    reps: number;
    weight: number;
  }>;
}

export default function WorkoutScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: 'New Exercise',
      sets: [{ reps: 0, weight: 0 }],
    };
    setExercises([...exercises, newExercise]);
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: [...ex.sets, { reps: 0, weight: 0 }]
        };
      }
      return ex;
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Today's Workout</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={addExercise}
          >
            <IconSymbol name="plus" size={24} color="#007AFF" />
            <Text style={styles.addButtonText}>Add Exercise</Text>
          </TouchableOpacity>
        </View>

        {exercises.map(exercise => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            
            {exercise.sets.map((set, index) => (
              <View key={index} style={styles.setRow}>
                <Text style={styles.setNumber}>Set {index + 1}</Text>
                <View style={styles.setDetails}>
                  <Text>{set.reps} reps</Text>
                  <Text>{set.weight} lbs</Text>
                </View>
              </View>
            ))}
            
            <TouchableOpacity 
              style={styles.addSetButton}
              onPress={() => addSet(exercise.id)}
            >
              <Text style={styles.addSetText}>Add Set</Text>
            </TouchableOpacity>
          </View>
        ))}

        {exercises.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No exercises added yet. Tap the + button to start your workout.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
  },
  addButtonText: {
    marginLeft: 8,
    color: '#007AFF',
    fontWeight: '500',
  },
  exerciseCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  setNumber: {
    fontWeight: '500',
  },
  setDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  addSetButton: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#e8e8e8',
    borderRadius: 6,
    alignItems: 'center',
  },
  addSetText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#666',
  },
});