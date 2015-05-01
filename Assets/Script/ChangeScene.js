#pragma strict


var playMode:int = 999;

function Start () {

}

function Update () {
	if (Input.GetKey(KeyCode.Space)){
		playMode = PlayerPrefs.GetInt("playModeVar"); 
		if(playMode == 1 && Input.GetKeyDown (KeyCode.Alpha1)){
			Debug.Log("CALL CHANGETO");
			GetComponent.<NetworkView>().RPC ("changLevel", RPCMode.All, "22");
		}
	}
}

function OnLevelWasLoaded (level : int) {

	print ("OnLevelWasLoaded : "+level);
	
	playMode = PlayerPrefs.GetInt("playModeVar"); 
	
	if(playMode == 1){
		print("playMode: Player");
		playerIni();
	}else{
		print("playMode: nonPlayrIni");
		nonPlayrIni();
	}
}

function playerIni(){
		 Destroy(gameObject.Find("MainCamera"));
		 gameObject.Find("FirstPersonCharacter").GetComponent(Camera).enabled = true;
		 gameObject.Find("FirstPersonCharacter").GetComponent(AudioListener).enabled = true;
		 gameObject.Find("FPSController").GetComponent(CharacterController).enabled = true;
//		 var characterMotor : CharacterMotor;
		 gameObject.Find("FPSController").GetComponent(UnityStandardAssets.Characters.FirstPerson.FirstPersonController).enabled = true;
}
function nonPlayrIni(){

	gameObject.Find("MainCamera").GetComponent(AudioListener).enabled = true;
	 Debug.Log("Disable FPC");
}


@RPC
function changLevel( changeTo : String){
	Debug.Log("changeTo : "+ changeTo);
	Application.LoadLevel('02-desert');
}