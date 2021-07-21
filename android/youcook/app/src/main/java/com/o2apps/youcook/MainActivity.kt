package com.o2apps.youcook

import android.annotation.SuppressLint
import android.app.Dialog
import android.content.DialogInterface
import android.graphics.Bitmap
import android.net.http.SslError
import android.os.Build
import android.os.Bundle
import android.os.Message
import android.view.View
import android.view.ViewGroup
import android.webkit.*
import android.widget.ProgressBar
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity


class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var mProgressBar: ProgressBar


    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView1)
        mProgressBar = findViewById(R.id.progress1)


        webView.apply {
            webViewClient = WebViewClientClass()   //클릭시 새 창 안뜨게

            webChromeClient = object : WebChromeClient() {

                override fun onCreateWindow(view: WebView?, isDialog: Boolean, isUserGesture: Boolean, resultMsg: Message?): Boolean {
                    val newWebView = WebView(this@MainActivity).apply {
                        webViewClient = WebViewClient()
                        settings.javaScriptEnabled = true
                    }

                    val dialog = Dialog(this@MainActivity).apply {
                        setContentView(newWebView)
                        window!!.attributes.width = ViewGroup.LayoutParams.MATCH_PARENT
                        window!!.attributes.height = ViewGroup.LayoutParams.MATCH_PARENT
                        show()
                    }
                    newWebView.webChromeClient = object : WebChromeClient() {
                        override fun onCloseWindow(window: WebView?) {
                            dialog.dismiss()
                            super.onCloseWindow(window)
                        }
                    }
                    (resultMsg?.obj as WebView.WebViewTransport).webView = newWebView
                    resultMsg.sendToTarget()
                    return true
                }
            }

            settings.javaScriptEnabled = true
            settings.setSupportMultipleWindows(true) // 새창 띄우기 허용 여부
            settings.javaScriptCanOpenWindowsAutomatically = true //자바스크립트 새창
            settings.loadWithOverviewMode = true // 메타태그 허용 여부
            settings.useWideViewPort = true // 화면 사이즈 맞추기 허용 여부
            settings.setSupportZoom(false) // 화면 줌 허용 여부
            settings.builtInZoomControls = false // 화면 확대 축소 허용 여부

            settings.cacheMode = WebSettings.LOAD_NO_CACHE // 브라우저 캐시 허용 여부
            settings.domStorageEnabled = true // 로컬 저장소 허용 여부
            settings.displayZoomControls = false

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                settings.safeBrowsingEnabled = true
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1){
                settings.mediaPlaybackRequiresUserGesture = false
            }

            settings.allowContentAccess = true
            settings.setGeolocationEnabled(true)

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                settings.allowUniversalAccessFromFileURLs = true
            }

            fitsSystemWindows = true
        }

        val url = "http://54.180.16.31/"
        webView.loadUrl(url)

    }

    inner class WebViewClientClass :WebViewClient() {
        override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
            view?.loadUrl("http://www.coho.kro.kr/")
            return true
        }

        override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
            super.onPageStarted(view, url, favicon)
            mProgressBar.visibility = ProgressBar.VISIBLE
            webView.visibility = View.INVISIBLE
        }

        override fun onPageCommitVisible(view: WebView?, url: String?) {
            super.onPageCommitVisible(view, url)
            mProgressBar.visibility = ProgressBar.GONE
            webView.visibility = View.VISIBLE
        }

        override fun onReceivedSslError(view: WebView?, handler: SslErrorHandler?, error: SslError?) {
            super.onReceivedSslError(view, handler, error)
            var builder: android.app.AlertDialog.Builder = android.app.AlertDialog.Builder(this@MainActivity)
            var message = "SSL Certificate Error."
            if (error != null) {
                when (error.primaryError) {
                    SslError.SSL_UNTRUSTED -> message = "The certificate authority is not trusted."
                    SslError.SSL_EXPIRED -> message = "The certificate has expired."
                    SslError.SSL_IDMISMATCH -> message = "The certificate Hostname mismatch."
                    SslError.SSL_NOTYETVALID -> message = "The certificate is not yet valid."
                }
            }
            message += "Do you Want to continue anyway?"
            builder.setMessage("SSL Certificate Error")
            builder.setMessage(message)
            builder.setPositiveButton("continue",
                    DialogInterface.OnClickListener { _, _ -> handler?.proceed() })
            builder.setNegativeButton("cancel",
                    DialogInterface.OnClickListener { dialog, which -> handler?.cancel() })
            val dialog: android.app.AlertDialog? = builder.create()
            dialog?.show()
        }
    }
}