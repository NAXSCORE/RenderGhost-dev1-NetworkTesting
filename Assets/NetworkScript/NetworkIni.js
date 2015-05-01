
var gameName:String = "RenderGhost_Test_01";
var playMode:int;

private var refreshing:boolean;
private var hostData:HostData[];
private var guiMargin:int = 50;
private var showModeMenu:boolean = true;

function Start(){
}

function startServer(){
	Network.InitializeServer(32, 25001, !Network.HavePublicAddress());
	MasterServer.RegisterHost(gameName, "TEST NAME", "DESC");
}


function refreshHostList(){
	MasterServer.RequestHostList(gameName);
	refreshing = true;
//	yield(WaitForSeconds
}


function Update(){
	if(refreshing){
		Debug.Log("REFRESHING "+MasterServer.PollHostList().Length);
		if(MasterServer.PollHostList().Length > 0){
			Debug.Log(MasterServer.PollHostList().Length);
			refreshing = false;
			hostData = MasterServer.PollHostList();
			
		}
	}
}

//Play
function playerIni(){
		 Destroy(gameObject.Find("MainCamera"));
		 gameObject.Find("FirstPersonCharacter").GetComponent(Camera).enabled = true;
		 gameObject.Find("FirstPersonCharacter").GetComponent(AudioListener).enabled = true;
		 gameObject.Find("FPSController").GetComponent(CharacterController).enabled = true;
//		 var characterMotor : CharacterMotor;
		 gameObject.Find("FPSController").GetComponent(UnityStandardAssets.Characters.FirstPerson.FirstPersonController).enabled = true;

	PlayerPrefs.SetInt("playModeVar",playMode); 
}
function nonPlayrIni(){

	gameObject.Find("MainCamera").GetComponent(AudioListener).enabled = true;
	if(playMode != 1){
		 Debug.Log("Disable FPC");
	}

	PlayerPrefs.SetInt("playModeVar",playMode); 

}


//Messages
function OnserverInitialized(){
	Debug.Log("Server initialized");
}

function OnMasterServerEvent(mse:MasterServerEvent){
	if(mse == MasterServerEvent.RegistrationSucceeded){
		Debug.Log("Registrated Server");
	}
}

// GUI
function OnGUI(){
	if(!Network.isClient && !Network.isServer){
		if(GUI.Button(Rect(guiMargin,guiMargin,guiMargin*4,guiMargin*2), "Create Server")){
			Debug.Log("Starting Server");
			startServer();
		}
		if(GUI.Button(Rect(guiMargin,170,guiMargin*4,guiMargin*2), "Refresh")){
			Debug.Log("Refreshing");
			refreshHostList();
		}
		
		if(hostData){
			for(var i:int=0; i < hostData.length; i++){
				if(GUI.Button(Rect(guiMargin, 290, guiMargin*4, guiMargin), hostData[i].gameName)){
					Network.Connect(hostData[i]);
					
				}
			}
		}
	}
	if(Network.isClient || Network.isServer){
		if(showModeMenu){
			if(GUI.Button(Rect(guiMargin, guiMargin, guiMargin*4, guiMargin), "Player")){ playMode = 1; playerIni(); showModeMenu = false;}
			if(GUI.Button(Rect(guiMargin, guiMargin*2+10, guiMargin*4, guiMargin), "Cam1")){ playMode = 2; nonPlayrIni(); showModeMenu = false;}
			if(GUI.Button(Rect(guiMargin, guiMargin*3+20, guiMargin*4, guiMargin), "Cam2")){ playMode = 3; nonPlayrIni(); showModeMenu = false;}
			if(GUI.Button(Rect(guiMargin, guiMargin*4+30, guiMargin*4, guiMargin), "cam3")){ playMode = 4; nonPlayrIni(); showModeMenu = false;}
		

		}
	}
}

