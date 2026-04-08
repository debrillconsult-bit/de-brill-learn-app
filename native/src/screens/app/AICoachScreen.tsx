import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Constants from 'expo-constants';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';

const API_BASE = Constants.expoConfig?.extra?.apiBaseUrl || '';

interface Message {
  id: string;
  role: 'user' | 'coach';
  text: string;
}

const WELCOME: Message = {
  id: 'welcome',
  role: 'coach',
  text: "Hi! I'm Coach Brill, your pronunciation guide. Ask me anything about English sounds, or practice a word together!",
};

export const AICoachScreen = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const flatRef = useRef<FlatList>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      });
      const data = await res.json();
      const coachMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'coach',
        text: data.reply || data.message || 'I had trouble responding. Try again!',
      };
      setMessages(prev => [...prev, coachMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'coach', text: 'Connection issue. Please try again.' },
      ]);
    }
    setLoading(false);
  };

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording: rec } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(rec);
      setIsRecording(true);
    } catch {}
  };

  const stopRecording = async () => {
    if (!recording) return;
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    setRecording(null);
    sendMessage('(Voice message — transcription not available in this version)');
  };

  useEffect(() => {
    if (messages.length > 1) {
      setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <DiagonalHeader title="Coach Brill" showBack />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageList}
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.coachBubble]}>
              {item.role === 'coach' && (
                <View style={styles.coachAvatar}>
                  <Ionicons name="sparkles" size={14} color={Colors.white} />
                </View>
              )}
              <View style={[styles.bubbleText, item.role === 'user' ? styles.userBubbleText : styles.coachBubbleText]}>
                <Text style={[styles.msgText, item.role === 'user' && styles.userMsgText]}>{item.text}</Text>
              </View>
            </View>
          )}
          ListFooterComponent={
            loading ? (
              <View style={[styles.bubble, styles.coachBubble]}>
                <View style={styles.coachAvatar}>
                  <Ionicons name="sparkles" size={14} color={Colors.white} />
                </View>
                <View style={[styles.bubbleText, styles.coachBubbleText]}>
                  <ActivityIndicator size="small" color={Colors.muted} />
                </View>
              </View>
            ) : null
          }
        />

        <View style={styles.inputRow}>
          <TouchableOpacity
            style={[styles.micBtn, isRecording && styles.micBtnActive]}
            onPressIn={startRecording}
            onPressOut={stopRecording}
          >
            <Ionicons name={isRecording ? 'mic' : 'mic-outline'} size={22} color={isRecording ? Colors.error : Colors.muted} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Ask Coach Brill..."
            placeholderTextColor={Colors.muted}
            multiline
            returnKeyType="send"
            onSubmitEditing={() => sendMessage(input)}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={() => sendMessage(input)}
            disabled={!input.trim() || loading}
          >
            <Ionicons name="send" size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  flex: { flex: 1 },
  messageList: { padding: Spacing.base, paddingBottom: Spacing.lg },
  bubble: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: Spacing.sm },
  userBubble: { justifyContent: 'flex-end' },
  coachBubble: { justifyContent: 'flex-start' },
  coachAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 2,
  },
  bubbleText: { maxWidth: '75%', borderRadius: Radius.lg, padding: 12 },
  coachBubbleText: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border },
  userBubbleText: { backgroundColor: Colors.orange },
  msgText: { fontSize: Typography.sizes.base, color: Colors.dark, lineHeight: 20 },
  userMsgText: { color: Colors.white },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: Spacing.sm,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 8,
  },
  micBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.offWhite, alignItems: 'center', justifyContent: 'center' },
  micBtnActive: { backgroundColor: '#FDECEA' },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: Colors.offWhite,
    borderRadius: Radius.xl,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: Typography.sizes.base,
    color: Colors.dark,
  },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.orange, alignItems: 'center', justifyContent: 'center' },
  sendBtnDisabled: { backgroundColor: Colors.border },
});
