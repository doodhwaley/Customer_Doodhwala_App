import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Switch,
  Image,
  ScrollView,
} from 'react-native';
import {
  UserCircle,
  CaretRight,
  BellRinging,
  List,
  Wallet,
  CreditCard,
  Bell,
  WhatsappLogo,
  ChatsCircle,
  EnvelopeSimple,
  PushPin,
} from 'phosphor-react-native';
import styles from './styles';
import ToggleButton from '../../Components/ToggleButton';
import {Config} from '../../Constants';
function MyAccount({route, navigation}) {
  const [bellEnabled, setBellEnabled] = useState(false);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile card */}
      <View style={styles.profileCard}>
        <View style={styles.profileCardHeader}>
          <View style={styles.profileCardHeaderImage}>
            {false ? (
              <Image
                //   source={require("../../assets/images/profile.png")}
                style={{width: 100, height: 100}}
              />
            ) : (
              <UserCircle size={70} color="#ccc" />
            )}
          </View>
          <View style={styles.profileCardHeaderText}>
            <Text style={styles.profileCardHeaderTextName}>John Doe</Text>
            <Text style={styles.profileCardHeaderTextEmail}>
              john.doe@example.com
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.profileCardHeaderEdit}>
              <Text style={styles.profileCardHeaderEditText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileCardHeaderAddressContainer}>
          <View style={styles.profileCardHeaderAddressText}>
            <Text style={styles.profileCardHeaderAddressTextTitle}>
              Delivery Address
            </Text>
            <Text style={styles.profileCardHeaderAddressTextAddress}>
              123 Main St, Anytown, USA
            </Text>
          </View>
          <View style={styles.profileCardHeaderAddress}>
            <TouchableOpacity>
              <CaretRight size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Links */}
      <ScrollView style={{width: '100%', marginTop: 10, paddingLeft: 5}}>
        <View style={{width: '100%', paddingBottom: 20}}>
          <View style={[styles.profileCard, {marginTop: 20}]}>
            <View style={styles.linkItem}>
              <View
                style={[
                  styles.linkIconContainer,
                  {backgroundColor: Config.baseColor2},
                ]}>
                <BellRinging size={24} color={Config.baseColor} />
              </View>
              <Text style={styles.linkText}>My Subscriptions</Text>
              <TouchableOpacity>
                <CaretRight size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.linkItem}>
              <View
                style={[
                  styles.linkIconContainer,
                  {backgroundColor: Config.baseColor2},
                ]}>
                <List size={24} color={Config.baseColor} />
              </View>
              <Text style={styles.linkText}>My Orders</Text>
              <TouchableOpacity>
                <CaretRight size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.linkItem}>
              <View
                style={[
                  styles.linkIconContainer,
                  {backgroundColor: Config.baseColor2},
                ]}>
                <Wallet size={24} color={Config.baseColor} />
              </View>
              <Text style={styles.linkText}>My Wallet</Text>
              <TouchableOpacity>
                <CaretRight size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.linkItem}>
              <View
                style={[
                  styles.linkIconContainer,
                  {backgroundColor: Config.baseColor2},
                ]}>
                <CreditCard size={24} color={Config.baseColor} />
              </View>
              <Text style={styles.linkText}>My Payments</Text>
              <TouchableOpacity>
                <CaretRight size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Alerts */}
          <Text style={styles.alertsText}>Alerts</Text>
          <View style={[styles.profileCard, {marginTop: 0}]}>
            <View style={styles.linkItem}>
              <View
                style={[
                  styles.linkIconContainer,
                  {backgroundColor: Config.baseColor2},
                ]}>
                <Bell size={24} color={Config.baseColor} />
              </View>
              <Text style={styles.linkText}>Ring the Bell</Text>
              <ToggleButton
                value={bellEnabled}
                onValueChange={setBellEnabled}
                trackColor={{false: '#767577', true: '#4488FF'}}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.linkItem}>
              <View
                style={[
                  styles.linkIconContainer,
                  {backgroundColor: Config.baseColor2},
                ]}>
                <WhatsappLogo size={24} color={Config.baseColor} />
              </View>
              <Text style={styles.linkText}>WhatsApp Notifications</Text>
              <ToggleButton
                value={whatsappEnabled}
                onValueChange={setWhatsappEnabled}
                trackColor={{false: '#767577', true: '#4488FF'}}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.linkItem}>
              <View
                style={[
                  styles.linkIconContainer,
                  {backgroundColor: Config.baseColor2},
                ]}>
                <ChatsCircle size={24} color={Config.baseColor} />
              </View>
              <Text style={styles.linkText}>SMS Notifications</Text>
              <ToggleButton
                value={smsEnabled}
                onValueChange={setSmsEnabled}
                trackColor={{false: '#767577', true: '#4488FF'}}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.linkItem}>
              <View
                style={[
                  styles.linkIconContainer,
                  {backgroundColor: Config.baseColor2},
                ]}>
                <EnvelopeSimple size={24} color={Config.baseColor} />
              </View>
              <Text style={styles.linkText}>Email Notifications</Text>
              <ToggleButton
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{false: '#767577', true: '#4488FF'}}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.linkItem}>
              <View
                style={[
                  styles.linkIconContainer,
                  {backgroundColor: Config.baseColor2},
                ]}>
                <PushPin size={24} color={Config.baseColor} />
              </View>
              <Text style={styles.linkText}>Push Notifications</Text>
              <ToggleButton
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{false: '#767577', true: '#4488FF'}}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyAccount;
