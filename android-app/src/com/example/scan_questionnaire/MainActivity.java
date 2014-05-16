package com.example.scan_questionnaire;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Base64;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends Activity {
	private Button scan;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
    	
		scan = (Button)findViewById(R.id.button1);
		scan.setOnClickListener(new OnClickListener() 
		{
			 @Override          
			 public void onClick(View v) 
			 {             
				 scan.setEnabled(false);
				 Intent intent = new Intent("com.google.zxing.client.android.SCAN");
				 intent.putExtra("SCAN_MODE", "QR_CODE_MODE");
				 startActivityForResult(intent, 0);
			  }         
			});
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		//getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}
	
	private void makeToast(String text){
        Toast toast = Toast.makeText(this, text, Toast.LENGTH_LONG);
        scan.setEnabled(true);
        toast.show();
        scan.setEnabled(true);
	}
	
	protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
	    super.onActivityResult(requestCode, resultCode, intent);
	    if (requestCode == 0) {
	        if (resultCode == RESULT_OK) {
	            String result = intent.getStringExtra("SCAN_RESULT");
	            if (result != null){
	            	new eventupdate().execute(result);
	            }else{
	            	makeToast("Something wrong with qr app!");
	            }

	        } else if (resultCode == RESULT_CANCELED) {                
	        	makeToast("Scan was Cancelled!");
	        }
	    }
	}
	
	public class eventupdate extends AsyncTask<String, Void, Boolean> {

	    protected Boolean doInBackground(String... text) {
	    	Boolean res = true;
	        try {
	        	SharedPreferences sharedPrefs = PreferenceManager.getDefaultSharedPreferences(MainActivity.this);
	        	
	        	HttpPost httpPost = new HttpPost(sharedPrefs.getString("pref_url", "http://server:port/alfresco/service/meetup/upload"));
	            String base64EncodedCredentials = "Basic " + Base64.encodeToString(
	                    (sharedPrefs.getString("pref_username", "") + ":" 
	                    		+ sharedPrefs.getString("pref_password", "")).getBytes(),
	                    Base64.NO_WRAP);
	            httpPost.setHeader("Authorization", base64EncodedCredentials);
	            JSONObject holder = new JSONObject(text[0]);
	            holder.put("sitename", sharedPrefs.getString("pref_sitename", ""));
	            Log.d("avi", holder.toString());
	            httpPost.setEntity(new StringEntity(holder.toString(),HTTP.UTF_8));
	            httpPost.setHeader("Accept", "application/json");
	            httpPost.setHeader("Content-type", "application/json");
	            HttpResponse resp = new DefaultHttpClient().execute(httpPost);
	            if (resp.getStatusLine().getStatusCode() != 200)
	            	res = false;
	        } catch (Exception e) {
	            e.printStackTrace();
	            res = false;
	        }
	        return res;
	
	    }
	    
	    @Override
	    protected void onPostExecute(Boolean result) {
	           super.onPostExecute(result);
	           
	           if (!result){
	        	   makeToast("Error sending..");    
	           }else{
	        	   makeToast("OK");  
	           }
	   }
	}
	
	public void onClickSettings(View v) {
		Intent i = new Intent(this, PrefActivity.class);
		startActivity(i);
	}
}
